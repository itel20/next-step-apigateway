import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { ConseilsComponent } from './conseils.component';

describe('ConseilsComponent', () => {
  let component: ConseilsComponent;
  let fixture: ComponentFixture<ConseilsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConseilsComponent],
      providers: [provideRouter([]), /* providers existants */],
    }).compileComponents();

    fixture = TestBed.createComponent(ConseilsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
