// Read-only public catalog aggregator. No service-role keys, private bookings or writes.
const COLUMNS={
 properties:'id,title,title_en,title_ru,description_en,district,address,property_type,listing_type,price,price_per_night,currency,bedrooms,bathrooms,area_sqm,cover_image,rating',
 services:'id,name_en,name_ru,description_en,description_ru,price,currency,category_id,provider_id,images'
};
const json=(res,status,payload)=>res.status(status).setHeader('Cache-Control','public, max-age=30, s-maxage=120').json(payload);
async function loadSupabase(kind,limit){
 const url=process.env.MYUNO_SUPABASE_URL, key=process.env.MYUNO_SUPABASE_ANON_KEY;
 if(!url||!key)return {status:'not_configured',items:[]};
 const view=kind==='properties'?'public_property_catalog':'public_service_catalog';
 const endpoint=new URL(url.replace(/\/$/,'')+'/rest/v1/'+view);
 endpoint.searchParams.set('select',COLUMNS[kind]);endpoint.searchParams.set('limit',String(limit));
 if(kind==='services')endpoint.searchParams.set('is_active','eq.true');
 const response=await fetch(endpoint,{headers:{apikey:key,Authorization:'Bearer '+key},signal:AbortSignal.timeout(7000)});
 if(!response.ok)throw Error('myuno catalog HTTP '+response.status);
 const rows=await response.json();if(!Array.isArray(rows))throw Error('Invalid myuno catalog response');
 return {status:'ok',items:rows.map(x=>({...x,source:'myuno'}))};
}
async function loadFinal(kind,limit){
 const base=process.env.MYUNO_FINAL_PUBLIC_URL;
 if(!base)return {status:'not_configured',items:[]};
 const path=kind==='services'?'/api/services':'/api/search/units';
 const endpoint=new URL(path,base);
 if(kind==='properties'){endpoint.searchParams.set('adultsCount','1');endpoint.searchParams.set('limit',String(limit));}
 const response=await fetch(endpoint,{headers:{Accept:'application/json'},signal:AbortSignal.timeout(7000)});
 if(!response.ok)throw Error('myUNO-final HTTP '+response.status);
 const data=await response.json();
 const candidates=kind==='services'?data.services:(data.units??data.results??data.items);
 if(!Array.isArray(candidates))throw Error('Unexpected myUNO-final response shape');
 return {status:'ok',items:candidates.slice(0,limit).map(x=>({...x,source:'myUNO-final'}))};
}
export default async function handler(req,res){
 if(req.method!=='GET')return json(res,405,{error:'method_not_allowed'});
 const kind=req.query.kind==='properties'?'properties':req.query.kind==='services'?'services':null;
 if(!kind)return json(res,400,{error:'kind must be services or properties'});
 const limit=Math.max(1,Math.min(30,Number.parseInt(req.query.limit,10)||12));
 const sources=await Promise.allSettled([loadSupabase(kind,limit),loadFinal(kind,limit)]);
 const results=sources.map((r,i)=>r.status==='fulfilled'?{name:i?'myUNO-final':'myuno',...r.value}:{name:i?'myUNO-final':'myuno',status:'error',items:[],error:'Source unavailable'});
 const items=results.flatMap(s=>s.items);
 return json(res,200,{kind,items,sources:results.map(({name,status,error})=>({name,status,...(error?{error}:{})})),partial:results.some(x=>x.status!=='ok')});
}
