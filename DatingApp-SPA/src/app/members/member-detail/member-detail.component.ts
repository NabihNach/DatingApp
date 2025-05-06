import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabsModule } from 'ngx-bootstrap/tabs';
import {
  NgxGalleryModule,
  NgxGalleryOptions,
  NgxGalleryImage,
  NgxGalleryAnimation
} from '@kolkov/ngx-gallery';
import { ActivatedRoute } from '@angular/router';
import { User } from '../../_models/user';
import { AlertifyService } from '../../_services/alertify.service';

@Component({
  selector: 'app-member-detail',
  standalone: true,
  imports: [
    CommonModule,
    TabsModule,
    NgxGalleryModule 
  ],
  templateUrl: './member-detail.component.html',
  styleUrls: ['./member-detail.component.css']
})
export class MemberDetailComponent implements OnInit {
  user!: User;
  galleryOptions!: NgxGalleryOptions[];
  galleryImages!: NgxGalleryImage[];

  constructor(
    private route: ActivatedRoute,
    private alertify: AlertifyService
  ) {}

  ngOnInit(): void {
    this.galleryOptions = [{
      width: '500px',
      height: '500px',
      imagePercent: 100,
      thumbnailsColumns: 4,
      imageAnimation: NgxGalleryAnimation.Slide,
      preview: false
    }];

    // Get resolved user data and setup images
    this.route.data.subscribe({
      next: data => {
        this.user = data['user'];
        this.galleryImages = this.getImages();
      },
      error: err => this.alertify.error('Problem loading user details')
    });
  }

  private getImages(): NgxGalleryImage[] {
    if (!this.user?.photos) {
      return [];
    }
    return this.user.photos.map(photo => ({
      small: photo.url,
      medium: photo.url,
      big: photo.url,
      description: photo.description
    }));
  }
}
