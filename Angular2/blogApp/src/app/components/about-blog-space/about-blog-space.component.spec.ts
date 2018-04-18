import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutBlogSpaceComponent } from './about-blog-space.component';

describe('AboutBlogSpaceComponent', () => {
  let component: AboutBlogSpaceComponent;
  let fixture: ComponentFixture<AboutBlogSpaceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AboutBlogSpaceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AboutBlogSpaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
