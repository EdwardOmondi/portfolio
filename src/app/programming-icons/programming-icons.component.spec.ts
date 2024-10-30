import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgrammingIconsComponent } from './programming-icons.component';

describe('ProgrammingIconsComponent', () => {
  let component: ProgrammingIconsComponent;
  let fixture: ComponentFixture<ProgrammingIconsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProgrammingIconsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProgrammingIconsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
