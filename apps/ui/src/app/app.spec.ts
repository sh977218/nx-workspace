import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { UserService } from './services/user.service';
import { App } from './app';

const mockUserService = {
  login: vi.fn(),
};

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
      providers: [
        provideRouter([]),
        { provide: UserService, useValue: mockUserService },
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
