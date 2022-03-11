import { Get, Post, Put, Delete, Body, Param, Controller } from '@nestjs/common';
import { StatsModal } from '../database';
import { AuthService } from '../services';

class StatsResponseDto {
  id: number;
  type: string;
  count: number;
  date: string;
}

class AddStatsDto {
  type: string;
  name: string;
  count: number;
  date: number;
  key: string;
}

@Controller('/stats')
export class StatsRouter {
  constructor(
    private authService: AuthService
  ) {
  }

  normalizeStats(object: any): StatsResponseDto {
    return {
      id: parseInt(object.id, 10),
      type: String(object.type),
      count: parseInt(object.count, 10),
      date: String(object.date),
    };
  }

  @Get()
  async getStats(): Promise<Array<StatsResponseDto>> {
    const stats = await StatsModal.findAll();

    return stats.map(this.normalizeStats);
  }

  @Post()
  async addStats(@Body() body: AddStatsDto): Promise<Array<StatsResponseDto>> {
    await this.authService.auth(body);

    await StatsModal.create({
      name: body.name,
      type: body.type,
      count: body.count,
      date: new Date(body.date),
    });

    return (await StatsModal.findAll()).map(this.normalizeStats);
  }

  @Put(':id')
  async editStats(@Param('id') id: number, @Body() body: AddStatsDto): Promise<Array<StatsResponseDto>> {
    await this.authService.auth(body);

    const stat = await StatsModal.findOne({ where: { id } });

    if (!stat) {
      throw new Error('Not found');
    }

    await StatsModal.update(body, { where: { id } });

    return (await StatsModal.findAll()).map(this.normalizeStats);
  }

  @Delete(':id')
  async deleteStats(@Param('id') id: number, @Body() body): Promise<Array<StatsResponseDto>> {
    await this.authService.auth(body);

    await StatsModal.destroy({ where: { id }});

    return (await StatsModal.findAll()).map(this.normalizeStats);
  }
}
