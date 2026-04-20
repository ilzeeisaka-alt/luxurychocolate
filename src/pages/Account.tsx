import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { useSeo } from "@/hooks/useSeo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { Loader2, LogOut, User, Package, ShieldCheck } from "lucide-react";
import Navbar from "@/components/Navbar";
import OrdersList from "@/components/account/OrdersList";
import { Link } from "react-router-dom";

const profileSchema = z.object({
  first_name: z.string().trim().max(100).optional().or(z.literal("")),
  last_name: z.string().trim().max(100).optional().or(z.literal("")),
  phone: z.string().trim().max(30).optional().or(z.literal("")),
  company_name: z.string().trim().max(200).optional().or(z.literal("")),
  vat_number: z.string().trim().max(50).optional().or(z.literal("")),
  registration_number: z.string().trim().max(50).optional().or(z.literal("")),
  legal_address: z.string().trim().max(300).optional().or(z.literal("")),
  legal_city: z.string().trim().max(100).optional().or(z.literal("")),
  legal_postal_code: z.string().trim().max(20).optional().or(z.literal("")),
  legal_country: z.string().trim().max(100).optional().or(z.literal("")),
  shipping_address: z.string().trim().max(300).optional().or(z.literal("")),
  shipping_city: z.string().trim().max(100).optional().or(z.literal("")),
  shipping_postal_code: z.string().trim().max(20).optional().or(z.literal("")),
  shipping_country: z.string().trim().max(100).optional().or(z.literal("")),
});

type ProfileForm = z.infer<typeof profileSchema>;

const emptyProfile: ProfileForm = {
  first_name: "", last_name: "", phone: "",
  company_name: "", vat_number: "", registration_number: "",
  legal_address: "", legal_city: "", legal_postal_code: "", legal_country: "",
  shipping_address: "", shipping_city: "", shipping_postal_code: "", shipping_country: "",
};

const Account = () => {
  const navigate = useNavigate();
  const { user, loading: authLoading, signOut } = useAuth();
  const [profile, setProfile] = useState<ProfileForm>(emptyProfile);
  const [loadingProfile, setLoadingProfile] = useState(true);
  const [saving, setSaving] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    if (!user) return;
    (async () => {
      const { data } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", user.id)
        .eq("role", "admin")
        .maybeSingle();
      setIsAdmin(!!data);
    })();
  }, [user]);

  useSeo({
    title: "Mans konts | Luxury Chocolate",
    description: "Pārvaldi savu profilu, uzņēmuma datus un pasūtījumus.",
    path: "/account",
  });

  useEffect(() => {
    if (!authLoading && !user) {
      navigate("/auth", { replace: true });
    }
  }, [user, authLoading, navigate]);

  useEffect(() => {
    if (!user) return;
    (async () => {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("user_id", user.id)
        .maybeSingle();
      if (error) {
        toast.error("Neizdevās ielādēt profilu");
      } else if (data) {
        setProfile({
          first_name: data.first_name ?? "",
          last_name: data.last_name ?? "",
          phone: data.phone ?? "",
          company_name: data.company_name ?? "",
          vat_number: data.vat_number ?? "",
          registration_number: data.registration_number ?? "",
          legal_address: data.legal_address ?? "",
          legal_city: data.legal_city ?? "",
          legal_postal_code: data.legal_postal_code ?? "",
          legal_country: data.legal_country ?? "",
          shipping_address: data.shipping_address ?? "",
          shipping_city: data.shipping_city ?? "",
          shipping_postal_code: data.shipping_postal_code ?? "",
          shipping_country: data.shipping_country ?? "",
        });
      }
      setLoadingProfile(false);
    })();
  }, [user]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    const parsed = profileSchema.safeParse(profile);
    if (!parsed.success) {
      toast.error(parsed.error.errors[0].message);
      return;
    }

    setSaving(true);
    const { error } = await supabase
      .from("profiles")
      .update(parsed.data)
      .eq("user_id", user.id);
    setSaving(false);

    if (error) {
      toast.error("Neizdevās saglabāt: " + error.message);
    } else {
      toast.success("Profils saglabāts!");
    }
  };

  const handleSignOut = async () => {
    await signOut();
    toast.success("Atslēdzies");
    navigate("/");
  };

  const update = (field: keyof ProfileForm, value: string) => {
    setProfile((p) => ({ ...p, [field]: value }));
  };

  if (authLoading || loadingProfile) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!user) return null;

  return (
    <main className="min-h-screen bg-background pt-14 lg:pt-24">
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">Mans konts</h1>
            <p className="text-muted-foreground mt-1">{user.email}</p>
          </div>
          <Button variant="outline" onClick={handleSignOut}>
            <LogOut className="h-4 w-4 mr-2" />
            Iziet
          </Button>
        </div>

        {isAdmin && (
          <Link
            to="/admin"
            className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-lg border border-primary/30 bg-primary/5 text-primary hover:bg-primary/10 transition-colors text-sm font-medium"
          >
            <ShieldCheck className="h-4 w-4" />
            Atvērt admin paneli
          </Link>
        )}

        <Tabs defaultValue="profile">
          <TabsList>
            <TabsTrigger value="profile"><User className="h-4 w-4 mr-2" />Profils</TabsTrigger>
            <TabsTrigger value="orders"><Package className="h-4 w-4 mr-2" />Pasūtījumi</TabsTrigger>
          </TabsList>

          <TabsContent value="profile">
            <form onSubmit={handleSave} className="space-y-6 mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Personīgā informācija</CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="first_name">Vārds</Label>
                    <Input id="first_name" value={profile.first_name} onChange={(e) => update("first_name", e.target.value)} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="last_name">Uzvārds</Label>
                    <Input id="last_name" value={profile.last_name} onChange={(e) => update("last_name", e.target.value)} />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="phone">Telefons</Label>
                    <Input id="phone" type="tel" value={profile.phone} onChange={(e) => update("phone", e.target.value)} />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Uzņēmuma dati</CardTitle>
                  <CardDescription>Rēķinu un PVN dokumentu sagatavošanai</CardDescription>
                </CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="company_name">Uzņēmuma nosaukums</Label>
                    <Input id="company_name" value={profile.company_name} onChange={(e) => update("company_name", e.target.value)} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="vat_number">PVN reģ. nr.</Label>
                    <Input id="vat_number" value={profile.vat_number} onChange={(e) => update("vat_number", e.target.value)} placeholder="LV40003XXXXXX" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="registration_number">Reģ. nr.</Label>
                    <Input id="registration_number" value={profile.registration_number} onChange={(e) => update("registration_number", e.target.value)} />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="legal_address">Juridiskā adrese</Label>
                    <Input id="legal_address" value={profile.legal_address} onChange={(e) => update("legal_address", e.target.value)} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="legal_city">Pilsēta</Label>
                    <Input id="legal_city" value={profile.legal_city} onChange={(e) => update("legal_city", e.target.value)} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="legal_postal_code">Pasta indekss</Label>
                    <Input id="legal_postal_code" value={profile.legal_postal_code} onChange={(e) => update("legal_postal_code", e.target.value)} />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="legal_country">Valsts</Label>
                    <Input id="legal_country" value={profile.legal_country} onChange={(e) => update("legal_country", e.target.value)} placeholder="Latvija" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Piegādes adrese</CardTitle>
                  <CardDescription>Noklusējuma adrese pasūtījumiem</CardDescription>
                </CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="shipping_address">Adrese</Label>
                    <Input id="shipping_address" value={profile.shipping_address} onChange={(e) => update("shipping_address", e.target.value)} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="shipping_city">Pilsēta</Label>
                    <Input id="shipping_city" value={profile.shipping_city} onChange={(e) => update("shipping_city", e.target.value)} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="shipping_postal_code">Pasta indekss</Label>
                    <Input id="shipping_postal_code" value={profile.shipping_postal_code} onChange={(e) => update("shipping_postal_code", e.target.value)} />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="shipping_country">Valsts</Label>
                    <Input id="shipping_country" value={profile.shipping_country} onChange={(e) => update("shipping_country", e.target.value)} />
                  </div>
                </CardContent>
              </Card>

              <Button type="submit" disabled={saving} size="lg">
                {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : "Saglabāt izmaiņas"}
              </Button>
            </form>
          </TabsContent>

          <TabsContent value="orders">
            <OrdersList userId={user.id} />
          </TabsContent>
        </Tabs>
      </div>
    </main>
  );
};

export default Account;
