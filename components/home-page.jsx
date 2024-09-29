import Link from "next/link";
import  Button  from "@/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { BarChart3, Shield, Users, AlertTriangle } from "lucide-react";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-200">
      {/* Hero Section */}
      <section className="relative h-[70vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-600">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px)`,
              backgroundSize: "20px 20px",
              transform: "rotate(-45deg)",
              opacity: 0.5,
            }}
          ></div>
        </div>
        <div className="relative z-10 text-center text-white">
          <h1 className="text-5xl font-bold mb-6">
            Community Safety Reporting
          </h1>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Help keep our community safe by reporting suspicious activities or
            crimes. Your report can make a difference.
          </p>
          <Link href="/report">
            <Button
              size="lg"
              className="bg-white text-blue-600 hover:bg-gray-100 hover:text-blue-700 font-bold py-3 px-6 rounded-lg shadow-lg transition duration-300 ease-in-out transform hover:scale-105"
            >
              Report a Crime
            </Button>
          </Link>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-center mb-12">
            Community Impact
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="text-center">
              <CardHeader>
                <CardTitle className="flex items-center text-center text-pretty text-lg">
                  <BarChart3 className="w-10 h-10 mr-2 text-blue-500" />
                  Reports Submitted
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-4xl font-bold">1,234</p>
                <p className="text-sm text-gray-500">Last 30 days</p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardHeader>
                <CardTitle className="flex items-center text-center text-pretty text-lg">
                  <Shield className="w-10 h-10 mr-2 text-green-500" />
                  Cases Resolved
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-4xl font-bold">789</p>
                <p className="text-sm text-gray-500">Last 30 days</p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardHeader>
                <CardTitle className="flex items-center text-center text-pretty text-lg">
                  <Users className="w-10 h-10 mr-2 text-yellow-500" />
                  Active Users
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-4xl font-bold">5,678</p>
                <p className="text-sm text-gray-500">And growing</p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardHeader>
                <CardTitle className="flex items-center text-center text-pretty text-lg">
                  <AlertTriangle className="w-10 h-10 mr-2 text-red-500" />
                  Response Time
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-4xl font-bold">15 min</p>
                <p className="text-sm text-gray-500">Average</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Featured Case Section */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Featured Case
          </h2>
          <div className="bg-white rounded-lg shadow-lg overflow-hidden max-w-4xl mx-auto">
            <div className="md:flex">
              <div className="md:flex-shrink-0">
                <div className="h-48 w-full md:h-full md:w-48 bg-gradient-to-br from-indigo-500 to-purple-600">
                  <div
                    className="h-full w-full"
                    style={{
                      backgroundImage: `radial-gradient(circle, rgba(255,255,255,0.2) 1px, transparent 1px)`,
                      backgroundSize: "10px 10px",
                      transform: "rotate(-45deg)",
                      opacity: 0.5,
                    }}
                  ></div>
                </div>
              </div>
              <div className="p-8">
                <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
                  Case #1234
                </div>
                <h3 className="mt-1 text-2xl leading-tight font-medium text-black">
                  Local Hero Stops Robbery
                </h3>
                <p className="mt-2 text-gray-500">
                  Thanks to a timely report from a vigilant community member,
                  local law enforcement was able to prevent a robbery at Main
                  Street Jewelry. The suspect was apprehended without incident,
                  and all stolen items were recovered.
                </p>
                <Button className="mt-4" variant="outline">
                  Read Full Story
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Community Involvement Section */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-8">
            Why Your Involvement Matters
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <Shield className="w-16 h-16 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">
                Safer Neighborhoods
              </h3>
              <p>
                Your reports help law enforcement identify and address crime
                hotspots, making our community safer for everyone.
              </p>
            </div>
            <div>
              <Users className="w-16 h-16 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Community Unity</h3>
              <p>
                By working together, we create a strong, united front against
                crime and build a more resilient community.
              </p>
            </div>
            <div>
              <AlertTriangle className="w-16 h-16 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Rapid Response</h3>
              <p>
                Quick reporting leads to faster response times, increasing the
                chances of preventing crimes and apprehending suspects.
              </p>
            </div>
          </div>
          <Link href="/report">
            <Button
              size="lg"
              className="mt-12 bg-white text-blue-600 hover:bg-gray-100"
            >
              Make a Difference - Report Now
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
