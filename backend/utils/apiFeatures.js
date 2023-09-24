class ApiFeatures {
    constructor(query, queryString) {
        this.query = query;
        this.queryString=queryString;
}

search(){
    const keyword=this.queryString.keyword ? {
        name: {
            $regex : this.queryString.keyword,
            $options:'i'
        }
    }:{}
    // console.log(keyword)

    this.query = this.query.find({...keyword})
    return  this;

}

filter(){
    const queryCopy = {...this.queryString};
    // console.log(queryCopy);
    // Removing some fields

    const removeFields = ["keyword","page","limit"];
    removeFields.forEach((field)=>{delete queryCopy[field]});
    
    // filter for price and rating
   
   let queryStr = JSON.stringify(queryCopy)
   queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g,key=> `$${key}`)
    this.query = this.query.find(JSON.parse(queryStr));
   
    return this;
}

pagination(resultPerPage){
    const currentPage = parseInt(this.queryString.page)||1;
    const skip = resultPerPage * (currentPage-1);

    this.query = this.query.limit(resultPerPage).skip(skip);
    return this;
}

}

module.exports = ApiFeatures