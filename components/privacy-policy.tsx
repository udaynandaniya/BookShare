"use client";

import { useTheme } from "next-themes";
import { useLanguage } from "@/components/language-provider";
import { motion } from "framer-motion";
import {
  Shield,
  Eye,
  Database,
  Clock,
  Users,
  Mail,
  AlertTriangle,
  ArrowLeft,
  MapPin,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function PrivacyPolicy() {
  const { theme } = useTheme();
  const { t } = useLanguage();

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">{t("privacy.title")}</h1>
      <p className="text-base mb-6">{t("privacy.intro")}</p>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">{t("privacy.collectionTitle")}</h2>
        <p className="text-base">{t("privacy.collectionContent")}</p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">{t("privacy.usageTitle")}</h2>
        <p className="text-base">{t("privacy.usageContent")}</p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">{t("privacy.sharingTitle")}</h2>
        <p className="text-base">{t("privacy.sharingContent")}</p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">{t("privacy.securityTitle")}</h2>
        <p className="text-base">{t("privacy.securityContent")}</p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">{t("privacy.changesTitle")}</h2>
        <p className="text-base">{t("privacy.changesContent")}</p>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-2">{t("privacy.contactTitle")}</h2>
        <p className="text-base">{t("privacy.contactContent")}</p>
      </section>
    </div>
  );
}
