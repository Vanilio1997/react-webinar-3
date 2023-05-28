 async function getArticlesData(url) {
   const response = await fetch(`/api/v1/articles${url}`);
   const json = await response.json();
   return json;
}


export async function getStartData(limit,skip){
   const json = await getArticlesData(`?limit=${limit}&skip=${skip}&fields=items(_id, title, price),count`);
   const {items,count} = await json.result;
   return {items, count};
}

export async function getPadinationData(limit,skip){
   const json = await getArticlesData(`?limit=${limit}&skip=${skip}`);
   const items = await json.result.items;
   return items;
}

export async function getGoodInfo(id){
   const json = await getArticlesData(`/${id}?fields=*,madeIn(title,code),category(title)`);
   const good = await json.result;
   return good;
}
