import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/LegalPage";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms of use · Guardian PK" },
      { name: "description", content: "Terms for using Guardian PK: eligibility, acceptable use, free availability in Pakistan, and the limits of the protection the app can give you on any device." },
      { property: "og:title", content: "Terms of use · Guardian PK" },
      { property: "og:url", content: "https://guardian.pk/terms" },
    ],
    links: [{ rel: "canonical", href: "https://guardian.pk/terms" }],
  }),
  component: TermsPage,
});

function TermsPage() {
  return (
    <LegalPage title="Terms of use" updated="[DATE: set on publication]">
      <div className="rounded-xl border border-line-strong bg-panel-2 p-4 text-sm text-ink-muted">
        <strong className="text-ink">Draft for legal review.</strong> Terms must be reviewed by counsel before
        publication. Remove this notice when approved.
      </div>

      <section>
        <h2>Acceptance</h2>
        <p>By installing or using Guardian PK, you agree to these terms. If you do not agree, do not use the app.</p>
      </section>

      <section>
        <h2>Who can use Guardian</h2>
        <p>
          [CONFIRM eligibility requirements.] Guardian is intended to be set up by an adult for a device they manage or
          use themselves.
        </p>
      </section>

      <section>
        <h2>Availability and cost</h2>
        <p>
          Guardian is free for users in Pakistan. [CONFIRM availability and pricing for users elsewhere.] Installation
          requires an Android device running Android 9 or later.
        </p>
      </section>

      <section>
        <h2>Limits of protection</h2>
        <p>
          Guardian filters content and apps based on rules and on-device classification. No filter is complete. Some
          content may get through, and some legitimate content may be blocked. Protection can also be affected by device
          settings, other software, or how the permissions you grant are set up.
        </p>
      </section>

      <section>
        <h2>Locks and time-locks</h2>
        <p>
          Features such as Fortress Mode are designed to make changes harder during a time-lock. Review the in-app setup
          before you enable a lock, so you understand what is locked and when it can change.
        </p>
      </section>

      <section>
        <h2>Acceptable use</h2>
        <p>
          Do not use Guardian to monitor a person without their knowledge where the law does not allow it, and do not
          try to reverse engineer, disrupt or misuse the app or this website.
        </p>
      </section>

      <section>
        <h2>Warranty and liability</h2>
        <p>
          Guardian is provided as is. [COUNSEL TO DRAFT warranty disclaimer and limitation of liability.]
        </p>
      </section>

      <section>
        <h2>Governing law</h2>
        <p>[COUNSEL TO CONFIRM governing law and jurisdiction.]</p>
      </section>

      <section>
        <h2>Contact and changes</h2>
        <p>
          Questions go to <a href="mailto:support@guardian.pk">support@guardian.pk</a>. We may update these terms, and
          we will change the date at the top of this page when we do.
        </p>
      </section>
    </LegalPage>
  );
}