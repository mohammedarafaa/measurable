import { Component } from '@angular/core';
import { GlobalImpact } from "../../components/global-impact/global-impact";
import { Award } from "../../components/award/award";
import { CustomerImpact } from "../../components/customer-impact/customer-impact";
import { LeadingCompaniesComponent } from "../../components/companies/companies";
import { RealEstateCarouselComponent } from "../../components/real-estate-carousel/real-estate-carousel";

@Component({
  selector: 'app-footer',
  imports: [GlobalImpact, Award, CustomerImpact, LeadingCompaniesComponent, RealEstateCarouselComponent],
  templateUrl: './footer.html',
  styleUrl: './footer.scss'
})
export class Footer {

}
