export class TrackDto {

    public title: string
    public year: number
    public artist_name: string
    public release: string
    public track_mmid: string
    public recording_mbid: string
    public language: string
    public rating: number
    public rating_count: number
    public url: string
    public covert_art_url: string  
    
    constructor(public track_id: number) {}

}