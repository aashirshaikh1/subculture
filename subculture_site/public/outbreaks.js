/* Outbreak Watch data.
   A curated snapshot, not a live feed — a published page cannot fetch other sites.
   Figures are copied from the sources named on each card and carry the date they
   were last checked. Ask Claude to refresh this file and the dates update with it. */
window.OUTBREAKS = {
  reviewed: '24 October 2026',
  items: [
    {
      name: 'Bundibugyo virus disease',
      organism: 'Orthoebolavirus bundibugyoense',
      kind: 'virus',
      status: 'Public health emergency of international concern',
      level: 'critical',
      where: 'DR Congo · Kenya · Nigeria',
      figures: [
        ['DR Congo', '9,704 confirmed cases, 4,687 deaths'],
        ['Case fatality', '48.3%'],
        ['Kenya', '9 cases, 1 death — one imported cluster'],
        ['Nigeria', '1 imported case in Abuja, 44 contacts traced']
      ],
      why: 'One of the six Ebola species, declared a PHEIC on 17 May 2026. Transmission in DR Congo remains sustained and has reached 66 health zones across eight provinces. Contact tracing stands at about 80%, below the 95% target, and many deaths are still occurring in the community rather than in care — the signal that cases are being found late. There is no approved vaccine or specific treatment for this species; the TUMAINI vaccine trial began enrolling in Bunia on 23 October 2026.',
      profile: 'ebola',
      note: 'Uganda\'s linked outbreak was declared over on 27 August 2026 after 20 cases and 2 deaths. WHO rates the risk as very high in DR Congo, high in bordering countries and low globally, and advises against travel or trade restrictions.',
      source: ['WHO Disease Outbreak News', 'https://www.who.int/emergencies/disease-outbreak-news/item/2026-DON622']
    },
    {
      name: 'Avian influenza A(H5N1)',
      organism: 'Influenza A virus, clade 2.3.4.4b',
      kind: 'virus',
      status: 'New human case',
      level: 'watch',
      where: 'United States — Washington State',
      figures: [
        ['New case', '1 confirmed, Yakima County'],
        ['Exposure', 'Infected dairy cattle'],
        ['Severity', 'Mild — isolating at home'],
        ['US total since 2024', '72 confirmed human H5 cases']
      ],
      why: 'The case that matters here is not this one patient, who was not seriously ill, but the pattern: 42 of the 72 US human cases since 2024 have come from dairy or agricultural exposure. Each mammalian infection is another chance for the virus to acquire the receptor-binding and polymerase changes that would let it spread between people. Public risk remains low, and this is the most closely watched signal in pandemic preparedness.',
      profile: 'flu',
      source: ['UKHSA outbreaks under monitoring', 'https://www.gov.uk/government/publications/outbreaks-under-monitoring-in-2026/outbreaks-under-monitoring-week-42-week-ending-16-october-2026']
    },
    {
      name: 'MERS-CoV',
      organism: 'Middle East respiratory syndrome coronavirus',
      kind: 'virus',
      status: 'Sporadic cases continuing',
      level: 'watch',
      where: 'Saudi Arabia',
      figures: [
        ['2026 to 5 October', '8 confirmed cases, 1 death'],
        ['Camel contact', '2 of 8 cases'],
        ['Global since 2012', '2,643 cases, 965 deaths'],
        ['Health worker spread', 'None reported this year']
      ],
      why: 'MERS has never stopped. Cases appear sporadically with no epidemiological link to one another, most without reported camel contact, which means the exposure route is often never established. Its case fatality of about 36% is far above SARS-CoV-2, and it is the clearest reminder that the coronavirus family holds more than one serious human pathogen.',
      profile: 'covid',
      source: ['UKHSA outbreaks under monitoring', 'https://www.gov.uk/government/publications/outbreaks-under-monitoring-in-2026/outbreaks-under-monitoring-week-42-week-ending-16-october-2026']
    },
    {
      name: 'Argentine haemorrhagic fever',
      organism: 'Junín virus (Arenaviridae)',
      kind: 'virus',
      status: 'Seasonal, below last year',
      level: 'stable',
      where: 'Argentina — Córdoba, Santa Fe, Buenos Aires',
      figures: [
        ['Reported 2026', '276 suspected, 22 confirmed'],
        ['Córdoba', '11 confirmed'],
        ['Santa Fe', '9 confirmed'],
        ['Same period 2025', '50 confirmed']
      ],
      why: 'A rodent-borne arenavirus carried by the drylands vesper mouse and acquired mainly by agricultural workers on the pampas during the maize harvest. Confirmed cases are running well below last year. It is one of the few viral haemorrhagic fevers with an effective licensed vaccine, Candid#1, used in the endemic region.',
      source: ['UKHSA outbreaks under monitoring', 'https://www.gov.uk/government/publications/outbreaks-under-monitoring-in-2026/outbreaks-under-monitoring-week-42-week-ending-16-october-2026']
    }
  ],
  feeds: [
    ['WHO Disease Outbreak News', 'https://www.who.int/emergencies/disease-outbreak-news'],
    ['WHO AFRO weekly bulletin', 'https://www.afro.who.int/health-topics/disease-outbreaks/outbreaks-and-other-emergencies-updates'],
    ['UKHSA outbreaks under monitoring', 'https://www.gov.uk/government/collections/outbreaks-under-monitoring'],
    ['ECDC communicable disease threats report', 'https://www.ecdc.europa.eu/en/publications-data/monitoring/weekly-threats-reports'],
    ['CDC current outbreaks', 'https://www.cdc.gov/outbreaks/']
  ]
};
