import { ResourceProps } from "@refinedev/core";

export const withAdminPrefix = (resources: ResourceProps[]): ResourceProps[] => {
  const prefix = "/admin";

// Hanya tambahkan prefix jika tipenya string
  const withPrefix = (path?: unknown): string | undefined => {
    return typeof path === "string" ? `${prefix}${path}` : undefined;
  };

  return resources.map((resource) => ({
    ...resource,
    list: withPrefix(resource.list),
    create: withPrefix(resource.create),
    edit: withPrefix(resource.edit),
    show: withPrefix(resource.show),
  }));
};

// Tambahan fungsi untuk prefix path string langsung
export const prefixAdminPath = (path: string): string => {
  const prefix = "/admin";
  return `${prefix}${path}`;
};
