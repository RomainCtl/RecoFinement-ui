import { Game } from './Game.model';

export class GameResponseDto {
    status: boolean;
    message: string;
    content: Game[];
    number_of_elements: number;
    page: number;
    total_pages: number;
}