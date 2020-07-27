export class Post {
    text: string;
    imageUrl: string;
    timeStamp: Date;
    from: string;
    to: string;

        constructor(){
            this.timeStamp = new Date();
            this.to = 'Everyone';
        }

}
