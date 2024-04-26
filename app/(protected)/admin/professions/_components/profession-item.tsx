import { getProfessions } from "@/actions/get-professions";

type Props = {
  item: Return<typeof getProfessions>[number];
};
export const ProfessionItem = ({ item }: Props) => {
  return <div>ProfessionItem</div>;
};
