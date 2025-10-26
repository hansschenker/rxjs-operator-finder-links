
const operatorPath = (name: string) => `https://rxjs.dev/api/operators/${name}`
const functionPath = (name: string) => `https://rxjs.dev/api/index/function/${name}`

const FUNCTION_PAGES = new Set<string>(['combineLatest','concat','concatAll','concatMap','forkJoin','mergeScan','zip'])
const OPERATOR_PAGES = new Set<string>([
  'map','mapTo','pluck','scan','pairwise','filter','distinct','distinctUntilChanged','distinctUntilKeyChanged',
  'elementAt','first','last','single','ignoreElements','take','takeLast','takeWhile','skip','skipLast','skipWhile',
  'toArray','merge','partition','race','startWith','withLatestFrom','reduce','count','max','min','defaultIfEmpty',
  'every','find','findIndex','isEmpty','buffer','bufferCount','tap','materialize','dematerialize','multicast',
  'publish','publishBehavior','publishLast','publishReplay','share','switchMap','switchMapTo','mergeMap','mergeMapTo',
  'exhaust','exhaustMap','expand','switchScan','window','windowCount','windowToggle','windowWhen','mergeAll','switchAll',
  'exhaustAll','combineLatestAll','bufferToggle','bufferWhen','skipUntil','takeUntil','catchError','retryWhen',
  'auditTime','debounceTime','sampleTime','throttleTime','delay','timeInterval','timestamp','timeout','bufferTime',
  'observeOn','subscribeOn','audit','debounce','throttle','delayWhen','sample','timeoutWith','timeoutWhen','windowTime',
  'raceWith','zipWith','mergeWith','concatWith','combineLatestWith'
])

export function getDocUrl(name: string): string {
  if (OPERATOR_PAGES.has(name)) return operatorPath(name)
  if (FUNCTION_PAGES.has(name)) return functionPath(name)
  return operatorPath(name)
}
