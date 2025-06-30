export function buildProductQuery({search,category}){
    const query ={};

    if(search){
        query.$or=[
            {name:{ $regex:search, $options: "i" }},
            {brand:{ $regex:search, $options: "i" }}
        ]
    }

    if(category){
        query.category = category;
    }

    return query;
}