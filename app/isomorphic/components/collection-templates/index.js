import { wrapCollectionLayout } from "@quintype/components";
import { FourColGrid } from './four-col-grid';

export default {
  FourColGrid: wrapCollectionLayout(FourColGrid),
  defaultTemplate: wrapCollectionLayout(FourColGrid)
}
