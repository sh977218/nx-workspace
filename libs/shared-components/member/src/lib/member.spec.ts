import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberComponent } from './member.component';

describe('Member', () => {
  let component: MemberComponent;
  let fixture: ComponentFixture<MemberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MemberComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(MemberComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('member', {
      name: 'Molecule Man',
      age: 29,
      secretIdentity: 'Dan Jukes',
      content:
        'A brilliant scientist with extraordinary molecular manipulation abilities, capable of controlling matter at the atomic level. His powers make him invaluable to the squad\'s success.',
      avatar:
        'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTUwIiBoZWlnaHQ9IjE1MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTUwIiBoZWlnaHQ9IjE1MCIgZmlsbD0iIzQyODVGNCIvPjxjaXJjbGUgY3g9Ijc1IiBjeT0iNDUiIHI9IjMwIiBmaWxsPSIjRkZGIi8+PHBvbHlnb24gcG9pbnRzPSI3NSw3MCA0NSw5NSAxMDUsOTUiIGZpbGw9IiNGRkYiLz48L3N2Zz4=',
      powers: ['Radiation resistance', 'Turning tiny', 'Radiation blast']
    });
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
