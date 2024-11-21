import { Component } from '@angular/core';
import { IpService } from '../ip.service';

@Component({
  selector: 'app-ip-calc',
  templateUrl: './ip-calc.component.html',
  styleUrls: ['./ip-calc.component.css']
})
export class IpCalcComponent {  
  ip: string = '';
  mask: string = '';
  networkIp: string = '';
  broadcastIp: string = '';
  totalHosts: number = 0;
  ipClass: string = '';
  isPrivate: string = '';
  rangeStart: string = '';
  rangeEnd: string = '';
  fullBinaryIp: string = '';  
  networkPart: string = '';   
  hostPart: string = '';      

  constructor(private ipService: IpService) {}

  calculateIpData(): void {
    const ipPattern = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
    
    if (!this.ip || !this.mask) {
      alert('Por favor, ingrese una IP y una Máscara de Red.');
      return; 
    }
    if (!ipPattern.test(this.ip)) {
      alert('La dirección IP ingresada no es válida.');
      return;
    }
    if (!ipPattern.test(this.mask)) {
      alert('La máscara de red ingresada no es válida.');
      return; 
    }
    this.networkIp = this.ipService.calculateNetworkIp(this.ip, this.mask);
    this.broadcastIp = this.ipService.calculateBroadcastIp(this.ip, this.mask);
    this.totalHosts = this.ipService.calculateHosts(this.mask);
    this.ipClass = this.ipService.getIpClass(this.ip);
    this.isPrivate = this.ipService.isPrivateIp(this.ip);
    
    this.calculateRange();
    this.displayBinaryIp();  
  }

  calculateRange(): void {
    const networkParts = this.networkIp.split('.').map(Number);
    const broadcastParts = this.broadcastIp.split('.').map(Number);
    networkParts[3] += 1; 
    broadcastParts[3] -= 1; 
    this.rangeStart = networkParts.join('.');
    this.rangeEnd = broadcastParts.join('.');
  }

  private ipToBinary(ip: string): string {
    return ip.split('.')
      .map(octet => ("00000000" + parseInt(octet, 10).toString(2)).slice(-8))
      .join('.');
  }

  displayBinaryIp(): void {
    const binaryIp = this.ipToBinary(this.ip).replace(/\./g, '');
    const binaryMask = this.ipToBinary(this.mask).replace(/\./g, '');

    let networkPart = '';
    let hostPart = '';

    for (let i = 0; i < binaryMask.length; i++) {
      if (binaryMask[i] === '1') {
        networkPart += binaryIp[i];
      } else {
        hostPart += binaryIp[i];
      }
    }

    this.fullBinaryIp = binaryIp;
    this.networkPart = networkPart;
    this.hostPart = hostPart;
  }
}
