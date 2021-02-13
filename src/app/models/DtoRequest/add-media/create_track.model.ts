export class CreateTrackDtoRequest {
  title: string = "";
  year: number = -1;
  artist_name: string = "";
  release: string = "";
  track_mmi: string = "";
  recording_mbid: string = "";
  spotify_id: number = -1;
  covert_art_url: string = "";
  genres: number[] = [];
}
