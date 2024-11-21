import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class IpService {

  constructor() { }

  ipToBinary(ip: string): string[] {
    return ip.split('.').map(part => ('00000000' + parseInt(part).toString(2)).slice(-8));
  }

  binaryToIp(binary: string[]): string {
    return binary.map(part => parseInt(part, 2).toString()).join('.');
  }

  calculateNetworkIp(ip: string, mask: string): string {
    const ipBinary = this.ipToBinary(ip);
    const maskBinary = this.ipToBinary(mask);
    const networkIpBinary = ipBinary.map((octet, idx) => (parseInt(octet, 2) & parseInt(maskBinary[idx], 2)).toString(2));
    return this.binaryToIp(networkIpBinary);
  }

  calculateBroadcastIp(ip: string, mask: string): string {
    const ipBinary = this.ipToBinary(ip);
    const maskBinary = this.ipToBinary(mask);
    const wildcardBinary = maskBinary.map(octet => (parseInt(octet, 2) ^ 255).toString(2));
    const broadcastIpBinary = ipBinary.map((octet, idx) => (parseInt(octet, 2) | parseInt(wildcardBinary[idx], 2)).toString(2));
    return this.binaryToIp(broadcastIpBinary);
  }

  calculateHosts(mask: string): number {
    const binaryMask = this.ipToBinary(mask).join('');
    const zeros = binaryMask.split('1').join('').length;
    return Math.pow(2, zeros) - 2;
  }

  getIpClass(ip: string): string {
    const firstOctet = parseInt(ip.split('.')[0]);
    if (firstOctet < 128) return 'Clase A';
    if (firstOctet < 192) return 'Clase B';
    if (firstOctet < 224) return 'Clase C';
    if (firstOctet < 240) return 'Clase D';
    return 'Clase E';
  }

  isPrivateIp(ip: string): string {
    const [firstOctet, secondOctet] = ip.split('.').map(Number);
    if (firstOctet === 10 || (firstOctet === 172 && secondOctet >= 16 && secondOctet <= 31) || (firstOctet === 192 && secondOctet === 168)) {
      return 'Privada';
    }
    return 'Pública';
  }
}
