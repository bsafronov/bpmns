import { getProfessions } from "@/actions/get-professions";
import AdminEntityItem from "@/components/admin-entity-item";

export const ProfessionList = async () => {
  const professions = await getProfessions();

  return (
    <div className="flex flex-col gap-2">
      {professions.map(
        ({
          createdAt,
          createdBy,
          id,
          name,
          published,
          updatedAt,
          updatedBy,
          description,
        }) => (
          <AdminEntityItem
            key={id}
            createdAt={createdAt}
            createdBy={createdBy}
            name={name}
            href={`/admin/professions/${id}`}
            updatedAt={updatedAt}
            updatedBy={updatedBy}
            published={published}
            description={description}
          ></AdminEntityItem>
        ),
      )}
    </div>
  );
};
