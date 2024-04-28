import getTemplates from "@/actions/get-templates";
import AdminEntityItem from "@/components/admin-entity-item";

export const TemplateList = async () => {
  const templates = await getTemplates();

  return (
    <div className="flex flex-col gap-2">
      {templates.map(
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
            href={`/admin/templates/${id}`}
            updatedAt={updatedAt}
            updatedBy={updatedBy}
            published={published}
            description={description}
          />
        ),
      )}
    </div>
  );
};
