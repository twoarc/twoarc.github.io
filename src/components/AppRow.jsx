export default function AppRow({ app, googlePlayBadge, appStoreBadge }) {
  return (
    <div>
      <div className="grid md:grid-cols-[300px_1fr] gap-8 items-start">
        {/* LEFT: Kare görsel */}
        <div className="rounded-3xl overflow-hidden border border-gray-200 bg-gray-50">
          <div className="aspect-square">
            <img
              src={app.image}
              alt={app.name}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* RIGHT */}
        <div>
          <h2 className="text-2xl md:text-4xl font-extrabold tracking-tight text-gray-900">
            {app.name}
          </h2>

          <p className="mt-3 text-gray-600 text-base md:text-lg max-w-3xl">
            {app.desc}
          </p>

          <div className="mt-6 flex flex-wrap gap-4">
            {/* Google Play */}
            {app.googlePlayUrl && (
              <a
                href={app.googlePlayUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex rounded-xl overflow-hidden border border-gray-200 hover:shadow-md transition"
              >
                <img
                  src={googlePlayBadge}
                  alt="Get it on Google Play"
                  className="h-12 md:h-14"
                />
              </a>
            )}

            {/* App Store */}
            {app.appStoreUrl && (
              <a
                href={app.appStoreUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex rounded-xl overflow-hidden border border-gray-200 hover:shadow-md transition"
              >
                <img
                  src={appStoreBadge}
                  alt="Download on the App Store"
                  className="h-12 md:h-14"
                />
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="mt-14 h-px bg-gray-200" />
    </div>
  );
}
