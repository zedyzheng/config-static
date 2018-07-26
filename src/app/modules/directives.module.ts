import { NgModule } from "@angular/core";
import { TableHeightAutoDirective } from "../directives/table-height-auto.directive";

@NgModule({
  declarations: [TableHeightAutoDirective],
  exports: [TableHeightAutoDirective]
})
export class DirectivesModule {}
