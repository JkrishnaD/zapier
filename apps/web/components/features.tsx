import { BiGlobe, BiRocket } from "react-icons/bi"
import { FcWorkflow } from "react-icons/fc"
export const Features = ()=>{
    return (
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800 flex justify-center">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">
              Key Features
            </h2>
            <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-3">
              <div className="flex flex-col items-center space-y-2 border-gray-800 p-4 rounded-lg">
                <FcWorkflow className="h-12 w-12 mb-2" />
                <h3 className="text-xl font-bold">Easy Zap Creation</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
                  Create automated workflows in minutes with our intuitive interface.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 border-gray-800 p-4 rounded-lg">
                <BiRocket className="h-12 w-12 mb-2" />
                <h3 className="text-xl font-bold text-center">Powerful Integrations</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
                  Connect with hundreds of popular apps and services.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 border-gray-800 p-4 rounded-lg">
                <BiGlobe className="h-12 w-12 mb-2" />
                <h3 className="text-xl font-bold text-center">Scalable Architecture</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
                  Built on a robust, queue-based system for reliable execution.
                </p>
              </div>
            </div>
          </div>
        </section>
    )
}