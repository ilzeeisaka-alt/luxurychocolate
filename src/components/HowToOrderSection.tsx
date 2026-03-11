import { Send, PenTool, CheckCircle, Truck } from "lucide-react";

const steps = [
  { icon: Send, number: "1", label: "Atsūtiet savu logo vai ideju" },
  { icon: PenTool, number: "2", label: "Mēs izveidosim dizaina paraugu" },
  { icon: CheckCircle, number: "3", label: "Apstipriniet dizainu" },
  { icon: Truck, number: "4", label: "Mēs izgatavosim un piegādāsim" },
];

const HowToOrderSection = () => {
  return (
    <section className="py-20" aria-labelledby="how-to-order-heading">
      <div className="container mx-auto text-center">
        <h2 id="how-to-order-heading" className="text-3xl sm:text-4xl text-foreground mb-12">
          Kā pasūtīt personalizētās šokolādes
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mb-10">
          {steps.map((step) => (
            <div key={step.number} className="flex flex-col items-center gap-3">
              <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center">
                <step.icon className="h-6 w-6 text-primary" aria-hidden="true" />
              </div>
              <span className="text-2xl font-bold text-primary">{step.number}</span>
              <p className="text-sm text-foreground/80 max-w-[180px]">{step.label}</p>
            </div>
          ))}
        </div>

        <p className="text-sm text-muted-foreground">
          ⏱ Izgatavošana: <strong>3–10 darba dienas</strong>
        </p>

        {/* SR-only for crawlers */}
        <p className="sr-only">
          Kā pasūtīt personalizētās šokolādes: 1) Atsūtiet savu logo vai ideju, 2) Mēs izveidosim dizaina paraugu, 3) Apstipriniet dizainu, 4) Mēs izgatavosim un piegādāsim. Izgatavošana: 3–10 darba dienas.
        </p>
      </div>
    </section>
  );
};

export default HowToOrderSection;
