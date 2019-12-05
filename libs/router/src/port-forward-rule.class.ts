import { IsIP, IsNumber } from 'class-validator';

export class PortForwardRule {
  @IsIP()
  public internalIp: string;
  @IsNumber()
  public internalPort: number;
  @IsNumber()
  public externalPort: number;
}
