import { Component, OnInit } from '@angular/core';
// @ts-ignore
import Typewriter from 't-writer.js';
import { formatDate } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.css'],
})
export class StartComponent implements OnInit {
  onKeyPress(event: KeyboardEvent) {
    this.router.navigate(['/home']);
  }
  constructor(private router: Router) {}

  ngOnInit(): void {
    const time = Date().slice(15, 24);
    const title = document.querySelector('.title');
    const titleWriter = new Typewriter(title, {
      loop: false,
      typeColor: 'green',
      cursorColor: 'green',
      animateCursor: true,
    });

    const subtitle = document.querySelector('.subtitle');
    const subtitleWriter = new Typewriter(subtitle, {
      loop: false,
      typeColor: 'green',
      cursorColor: 'green',
      animateCursor: true,
    });
    const intro = document.querySelector('.intro');
    const introWriter = new Typewriter(intro, {
      loop: false,
      typeColor: 'green',
      cursorColor: 'green',
      animateCursor: true,
    });
    introWriter
      .type('Session started at ' + time)
      .rest(2000)
      .removeCursor()
      .start();
    titleWriter
      .removeCursor()
      .rest(5000)
      .addCursor()
      .type("Hi, I'm Edward.\n A software engineer")
      .rest(1000)
      .removeCursor()
      .start();
    subtitleWriter
      .removeCursor()
      .rest(9000)
      .addCursor()
      .type('Click here to continue')
      .start();
  }
}
