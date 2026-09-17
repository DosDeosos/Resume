import { StackRadarChart } from "@/components/charts/stack-radar-chart";
import { TenureChart } from "@/components/charts/tenure-chart";
import { LocaleSwitcher } from "@/components/i18n/locale-switcher";
import { StackCategoryCard } from "@/components/sections/stack-category-card";
import { ContactQr } from "@/components/showcase/contact-qr";
import { ExportButtons } from "@/components/showcase/export-buttons";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { stackCategories } from "@/data/resume";
import { Chip } from "@heroui/react";
import type { Meta, StoryObj } from "@storybook/react";
import { Sparkles } from "lucide-react";

const meta = {
  title: "UI/Components",
  tags: ["autodocs"],
} satisfies Meta;

export default meta;

export const Buttons: StoryObj = {
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      <Button>
        <Sparkles aria-hidden />
        Primary
      </Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
      <Button size="sm">Small</Button>
      <Button size="lg">Large</Button>
    </div>
  ),
};

export const HeroUiChips: StoryObj = {
  render: () => (
    <div className="flex gap-2">
      {(["accent", "success", "warning", "danger", "default"] as const).map(
        (color) => (
          <Chip key={color} color={color} variant="soft" size="sm">
            <Chip.Label>{color}</Chip.Label>
          </Chip>
        ),
      )}
    </div>
  ),
};

export const TabsExample: StoryObj = {
  render: () => (
    <Tabs defaultValue="one" className="w-80">
      <TabsList>
        <TabsTrigger value="one">One</TabsTrigger>
        <TabsTrigger value="two">Two</TabsTrigger>
      </TabsList>
      <TabsContent value="one" className="card-stack card-stack-cyan">
        First panel
      </TabsContent>
      <TabsContent value="two" className="card-stack card-stack-pink">
        Second panel
      </TabsContent>
    </Tabs>
  ),
};

export const LocaleSwitch: StoryObj = {
  render: () => <LocaleSwitcher />,
};

export const StackCard: StoryObj = {
  render: () => (
    <div className="w-80">
      <StackCategoryCard category={stackCategories[3]} />
    </div>
  ),
};

export const Radar: StoryObj = {
  render: () => (
    <div className="w-180">
      <StackRadarChart />
    </div>
  ),
};

export const Tenure: StoryObj = {
  render: () => (
    <div className="w-160">
      <TenureChart />
    </div>
  ),
};

export const Exports: StoryObj = {
  render: () => <ExportButtons />,
};

export const Qr: StoryObj = {
  render: () => <ContactQr />,
};
