export class Photo {
    albumId:number;
    id:number;
    title:string;
    url:string;
    thumbnailUrl:string;
    

    fromJson(input):Photo
    {
        this.albumId=input["albumId"];
        this.id=input["id"];
        this.title=input["title"];
        this.url=input["url"];
        this.thumbnailUrl=input["thumbnailUrl"];
        return this;
    }
}
