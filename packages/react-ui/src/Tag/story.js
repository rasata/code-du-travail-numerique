import React from "react";

import { Section } from "../layout/Section";
import { Tag } from ".";

export default {
  component: Tag,
  title: "Components/Tag",
};

export const base = () => (
  <>
    <Section>
      <p>
        <Tag>This is a basic text</Tag>
      </p>
    </Section>
  </>
);
