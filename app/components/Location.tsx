'use client'

import { motion } from 'framer-motion'
import { Homepage, SiteSettings } from '@/lib/types'
import SectionTitle from './ui/SectionTitle'
import { MapPin, Clock, Plane, Train, Bus, Car, Navigation, ArrowUpRight } from 'lucide-react'

interface LocationProps {
  data: Homepage | null
  settings: SiteSettings | null
}

export default function Location({ data, settings }: LocationProps) {
  if (!data) return null

  const hasGettingHere =
    data.gettingHere?.fromAirport ||
    data.gettingHere?.byTrain ||
    data.gettingHere?.byBus

  return (
    <section id="location" className="section bg-neutral-50 overflow-hidden">
      <div className="container-custom">
        <SectionTitle
          title={data.locationTitle || 'Location'}
          subtitle={data.locationSubtitle || 'Find Us'}
          description={data.locationDescription}
        />

        <div className="grid lg:grid-cols-2 gap-8 md:gap-12">
          {/* Map */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="relative aspect-square lg:aspect-auto lg:min-h-[500px] rounded-3xl overflow-hidden shadow-card"
          >
            {(() => {
              const addressParts = []
              if (settings?.siteName) addressParts.push(settings.siteName)
              if (settings?.address?.line1) addressParts.push(settings.address.line1)
              if (settings?.address?.city) addressParts.push(settings.address.city)
              if (settings?.address?.country) addressParts.push(settings.address.country)
              const mapQuery = addressParts.length > 0
                ? encodeURIComponent(addressParts.join(', '))
                : settings?.coordinates?.lat && settings?.coordinates?.lng
                  ? `${settings.coordinates.lat},${settings.coordinates.lng}`
                  : null

              return mapQuery ? (
                <iframe
                  src={`https://www.google.com/maps?q=${mapQuery}&z=16&output=embed`}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="absolute inset-0 w-full h-full"
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center bg-neutral-200 text-neutral-400">
                  <MapPin className="w-16 h-16" />
                </div>
              )
            })()}
          </motion.div>

          {/* Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-8"
          >
            {/* Address */}
            {settings?.address && (
              <div className="bento-card">
                <h3 className="font-heading text-xl font-semibold text-neutral-900 mb-4 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-teal-100 flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-teal-600" />
                  </div>
                  Address
                </h3>
                <p className="text-neutral-600 mb-6 leading-relaxed">
                  {settings.address.line1 && <>{settings.address.line1}<br /></>}
                  {settings.address.line2 && <>{settings.address.line2}<br /></>}
                  {settings.address.city && <>{settings.address.city}, </>}
                  {settings.address.country}
                </p>

                {/* Navigation Buttons */}
                <div className="flex flex-wrap gap-3">
                  {(settings?.coordinates?.lat && settings?.coordinates?.lng) && (
                    <a
                      href={`https://www.google.com/maps/dir/?api=1&destination=${settings.coordinates.lat},${settings.coordinates.lng}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-teal text-sm"
                    >
                      <Navigation className="w-4 h-4" />
                      Get Directions
                    </a>
                  )}

                  <a
                    href="https://pickme.lk/app"
                    onClick={(e) => {
                      const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent)
                      const isAndroid = /Android/.test(navigator.userAgent)

                      if (isAndroid) {
                        e.preventDefault()
                        window.location.href = 'intent://pickme.lk/#Intent;scheme=https;package=com.pickme.passenger;action=android.intent.action.VIEW;end'
                      } else if (isIOS) {
                        e.preventDefault()
                        window.location.href = 'pickme://'
                      } else {
                        e.preventDefault()
                        window.open('https://pickme.lk', '_blank')
                      }
                    }}
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#00B900] text-white text-sm font-medium rounded-full hover:bg-[#00A000] transition-colors cursor-pointer"
                  >
                    <Car className="w-4 h-4" />
                    Book with PickMe
                  </a>
                </div>
              </div>
            )}

            {/* Nearby Places */}
            {data.nearbyPlaces && data.nearbyPlaces.length > 0 && (
              <div className="bento-card">
                <h3 className="font-heading text-xl font-semibold text-neutral-900 mb-4">
                  Nearby Attractions
                </h3>
                <div className="space-y-3">
                  {data.nearbyPlaces.map((place, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center py-3 border-b border-neutral-100 last:border-0"
                    >
                      <span className="text-neutral-700 font-medium">{place.name}</span>
                      <div className="flex items-center gap-4 text-sm text-neutral-500">
                        <span className="flex items-center gap-1.5 badge">
                          <MapPin className="w-3.5 h-3.5 text-teal-600" />
                          {place.distance}
                        </span>
                        {place.time && (
                          <span className="flex items-center gap-1.5 badge">
                            <Clock className="w-3.5 h-3.5 text-teal-600" />
                            {place.time}
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Getting Here */}
            {hasGettingHere && (
              <div className="bento-card bg-gradient-to-br from-neutral-900 to-neutral-800 text-white">
                <h3 className="font-heading text-xl font-semibold mb-5">
                  Getting Here
                </h3>
                <div className="space-y-5">
                  {data.gettingHere?.fromAirport && (
                    <div className="flex gap-4">
                      <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0">
                        <Plane className="w-5 h-5 text-teal-400" />
                      </div>
                      <div>
                        <p className="font-medium text-white mb-1">From Airport</p>
                        <p className="text-sm text-neutral-300 leading-relaxed">
                          {data.gettingHere.fromAirport}
                        </p>
                      </div>
                    </div>
                  )}
                  {data.gettingHere?.byTrain && (
                    <div className="flex gap-4">
                      <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0">
                        <Train className="w-5 h-5 text-teal-400" />
                      </div>
                      <div>
                        <p className="font-medium text-white mb-1">By Train</p>
                        <p className="text-sm text-neutral-300 leading-relaxed">
                          {data.gettingHere.byTrain}
                        </p>
                      </div>
                    </div>
                  )}
                  {data.gettingHere?.byBus && (
                    <div className="flex gap-4">
                      <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0">
                        <Bus className="w-5 h-5 text-teal-400" />
                      </div>
                      <div>
                        <p className="font-medium text-white mb-1">By Bus</p>
                        <p className="text-sm text-neutral-300 leading-relaxed">
                          {data.gettingHere.byBus}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
