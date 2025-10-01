export default function CollectionPage() {
  return (
    <main className="min-h-screen bg-[#FBFBFB]">
      <div className="px-4 py-12 md:px-8 md:py-16">
        <h1 className="font-neue-montreal-mono mb-6 text-2xl font-medium text-black md:text-3xl">
          Collection
        </h1>
        <p className="font-neue-montreal max-w-2xl text-lg text-black/70">
          Discover our curated collection of premium skincare products. Each
          item is carefully selected to provide you with the best in natural
          beauty and wellness.
        </p>

        <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {/* Placeholder for collection items */}
          <div className="rounded-lg bg-white p-6 shadow-sm">
            <div className="mb-4 h-48 w-full rounded-md bg-gray-200"></div>
            <h3 className="font-neue-montreal mb-2 text-lg font-medium">
              Coming Soon
            </h3>
            <p className="text-black/60">
              Collection items will be displayed here
            </p>
          </div>

          <div className="rounded-lg bg-white p-6 shadow-sm">
            <div className="mb-4 h-48 w-full rounded-md bg-gray-200"></div>
            <h3 className="font-neue-montreal mb-2 text-lg font-medium">
              Coming Soon
            </h3>
            <p className="text-black/60">
              Collection items will be displayed here
            </p>
          </div>

          <div className="rounded-lg bg-white p-6 shadow-sm">
            <div className="mb-4 h-48 w-full rounded-md bg-gray-200"></div>
            <h3 className="font-neue-montreal mb-2 text-lg font-medium">
              Coming Soon
            </h3>
            <p className="text-black/60">
              Collection items will be displayed here
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
