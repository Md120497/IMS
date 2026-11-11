import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterPage } from './footer-page';

describe('FooterPage', () => {
  let component: FooterPage;
  let fixture: ComponentFixture<FooterPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FooterPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FooterPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
