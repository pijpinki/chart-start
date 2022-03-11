import { Controller, Get, Post, Body, Delete, Param, Query } from '@nestjs/common';
import { AuthService } from '../services';
import { VpnModal } from '../database';

class VpnDto {
  id: number;
  name: string;
  createdAt: number;
}

class GetVpnListDto {
  key: string;
}

class AddVpnDto {
  name: string;
  key: string;
}

@Controller('/vpn')
export class VpnRouter {
  constructor(
    private authService: AuthService
  ) {
  }

  normalizeVpn(object: any): VpnDto {
    return {
      id: Number(object.id),
      name: String(object.name),
      createdAt: object.createdAt.getTime(),
    }
  }

  @Get()
  async getVpnList(@Query() input: GetVpnListDto): Promise<Array<VpnDto>> {
    console.info(input);
    await this.authService.auth(input);

    const vpnList = await VpnModal.findAll();

    return vpnList.map(this.normalizeVpn.bind(this));
  }

  @Post()
  async addVpn(@Body() input: AddVpnDto) {
    await this.authService.auth(input);

    const existVpn = await VpnModal.findOne({ where: { name: input.name }});

    if (existVpn) {
      throw new Error('This name already exist');
    }

    await VpnModal.create({
      name: input.name,
      key: `${input.name}.opvn`,
    });

    const vpnList = await VpnModal.findAll();

    return vpnList.map(this.normalizeVpn.bind(this));
  }

  @Delete(':id')
  async deleteVpn(@Param('id') id: number, @Body() body: GetVpnListDto ) {
    await this.authService.auth(body);

    await VpnModal.destroy({ where: { id }});

    return (await VpnModal.findAll()).map(this.normalizeVpn.bind(this));
  }
}
