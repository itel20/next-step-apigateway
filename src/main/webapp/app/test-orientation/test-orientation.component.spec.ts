import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TestOrientationComponent } from './test-orientation.component';

describe('TestOrientationComponent', () => {
  let component: TestOrientationComponent;
  let fixture: ComponentFixture<TestOrientationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestOrientationComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TestOrientationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
