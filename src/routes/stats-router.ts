import { Get, Controller } from '@nestjs/common';
import { StatsModal } from '../database';

class StatsResponseDto {
  id: number;
  type: string;
  count: number;
  date: string;
}

@Controller('/stats')
export class StatsRouter {
  @Get()
  async getStats(): Promise<Array<StatsResponseDto>> {
    const stats = await StatsModal.findAll();

    return stats.map((stat: any) => ({
      id: parseInt(stat.id, 10),
      type: String(stat.type),
      count: parseInt(stat.count, 10),
      date: String(stat.date),
    }))
  }
}
