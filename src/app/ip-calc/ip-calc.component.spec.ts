import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IpCalcComponent } from './ip-calc.component';

describe('IpCalcComponent', () => {
  let component: IpCalcComponent;
  let fixture: ComponentFixture<IpCalcComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [IpCalcComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IpCalcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
