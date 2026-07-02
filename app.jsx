var __ReactLib = (typeof window !== "undefined" && window.React) ? window.React
  : (typeof React !== "undefined" ? React : null);
if (!__ReactLib) {
  throw new Error("[PF Stock] React is not available in this environment (neither window.React nor a global React was found).");
}
var { useState, useEffect, useCallback, useRef, useMemo, Component } = __ReactLib;
class ErrorBoundary extends Component {
  constructor(props) { super(props); this.state = { error: null }; }
  static getDerivedStateFromError(e) { return { error: e }; }
  render() {
    if (this.state.error) return (
      <div style={{ padding: 32, fontFamily: "system-ui", color: "#111" }}>
        <div style={{ fontWeight: 700, fontSize: 18, marginBottom: 8, color: "#b91c1c" }}>Error al cargar la app</div>
        <pre style={{ background: "#fef2f2", border: "1px solid #fecaca", borderRadius: 8, padding: 12, fontSize: 12, overflow: "auto", color: "#7f1d1d" }}>{String(this.state.error)}</pre>
        <button onClick={() => this.setState({ error: null })} style={{ marginTop: 12, padding: "8px 16px", background: "#2563eb", color: "#fff", border: "none", borderRadius: 8, cursor: "pointer" }}>Reintentar</button>
      </div>
    );
    return this.props.children;
  }
}

function AppRoot() { return <ErrorBoundary><App /></ErrorBoundary>; }
window.__AppRoot = AppRoot;
// ─── Data ─────────────────────────────────────────────────────────────────────
const SUBFAMILIES_DATA = [
  {code: "R017", name: "Clipeadora Poly Clip Ica 8700", plantCode: "P4"},
  {code: "R021", name: "Embuchadora Clipeadora Tipper Tie", plantCode: "P4"},
  {code: "R023", name: "RED DE INCENDIO PLANTAS", plantCode: "P3"},
  {code: "R034", name: "Envasadora Ulma Atlanta Super X", plantCode: "P3"},
  {code: "R035", name: "Envasadora Multivac B-500", plantCode: "P4"},
  {code: "R039", name: "ENVASADORA MULTIVAC R-535 (Pizza)", plantCode: "P5"},
  {code: "R064", name: "CLIPEADORA POLY CLIP MOD. FCA 60", plantCode: "P3"},
  {code: "R065", name: "CLIPEADORA POLY CLIP MOD. ICA SL", plantCode: "P4"},
  {code: "R095", name: "BOMBA DE VACIO MAPRO MOD.CL720M", plantCode: "P5"},
  {code: "R097", name: "ENVASADORA SEALPAC MOD. RE25 (SANDWICH)", plantCode: "P6"},
  {code: "R098", name: "Ajizador MS", plantCode: "P4"},
  {code: "R109", name: "SISTEMAS DE VACIO CLIMATIZADORES (SADEMA)", plantCode: "SDM"},
  {code: "R113", name: "EMBUTIDORA HANDTMANN MOD VF-838S 37952", plantCode: "P3"},
  {code: "R114", name: "EMBUTIDORA HANDTMANN VF-628", plantCode: "P3"},
  {code: "R115", name: "Embutidora Handtmann Vf -100 /240", plantCode: "P3"},
  {code: "R118", name: "Embutidora Metalquimia Twinvac Pc", plantCode: "P3"},
  {code: "R119", name: "EMBUTIDORA HANDTMANN HVF-664", plantCode: "P4"},
  {code: "R125", name: "Cargador de Bolsas Cryovac BL 19", plantCode: "P4"},
  {code: "R129", name: "DESMOLDADORA CREMINOX MOD.DJ10", plantCode: "P4"},
  {code: "R132", name: "SISTEMA MANIPULADOR SANDWICH OVA", plantCode: "P6"},
  {code: "R145", name: "Sierra Desposte Dick", plantCode: "P4"},
  {code: "R151", name: "Embutidora Handtmann Vf-620", plantCode: "P4"},
  {code: "R163", name: "CFS SCANMIDI 10 (Descongelador)", plantCode: "P4"},
  {code: "R166", name: "Cozzini Emulsor VS901mc", plantCode: "P4"},
  {code: "R173", name: "Cozzini Mezcladora Cvmb2000", plantCode: "P4"},
  {code: "R175", name: "Wolfking Moledora C400", plantCode: "P3"},
  {code: "R176", name: "MOLEDORA GEA POWERGRIND 280", plantCode: "P3"},
  {code: "R184", name: "PALETIZADOR LANTECH MOD Q300", plantCode: "P5"},
  {code: "R187", name: "HIDROLAVADORAS KARCHER", plantCode: "P4"},
  {code: "R188", name: "Elevador Para Carros", plantCode: "P4"},
  {code: "R191", name: "Cutter K&G VSM 500L", plantCode: "P4"},
  {code: "R196", name: "Moledora K&G", plantCode: "P4"},
  {code: "R198", name: "CUTTER GEA MOD. V500L", plantCode: "P4"},
  {code: "R205", name: "Bomba Amoniaco WITT GP-51 (Sadema)", plantCode: "SDM"},
  {code: "R206", name: "Inyectora Metalquimia 120/3000 Ci", plantCode: "P4"},
  {code: "R207", name: "Tenderizador Metalquimia", plantCode: "P4"},
  {code: "R208", name: "Compresor Sabroe", plantCode: "SDM"},
  {code: "R209", name: "Compresor Mycom N200-Vld", plantCode: "SDM"},
  {code: "R215", name: "Generador Hielo Maja Rve 5000", plantCode: "SDM"},
  {code: "R218", name: "Camaras de Amoniaco", plantCode: "SDM"},
  {code: "R222", name: "Accesorios Camaras", plantCode: "SDM"},
  {code: "R225", name: "MOLEDORA BIRO MOD. EMG-32", plantCode: "P6"},
  {code: "R235", name: "CONDENSADORES GUNTNER MOD. FCE1700", plantCode: "SDM"},
  {code: "R236", name: "ROBOT FANUC MOD.A05B (TAVIL", plantCode: "P3"},
  {code: "R237", name: "ROBOT FANUC MOD.036 (TAVIL)", plantCode: "P3"},
  {code: "R241", name: "Equipos Roser Pediluvios Plantas", plantCode: "P5"},
  {code: "R242", name: "EQUIPOS ITEC PEDILUVIOS PLANTAS", plantCode: "P4"},
  {code: "R243", name: "EQUIPOS AIRE ACONDICIONADO HUAWEI MOD.NETCOL5000A", plantCode: "P5"},
  {code: "R250", name: "Lavadoras de Carros Mimasa LC 200", plantCode: "P4"},
  {code: "R256", name: "Carros Prensa Inox", plantCode: "P4"},
  {code: "R258", name: "Mezcladores de Agua Vapor", plantCode: "P5"},
  {code: "R264", name: "CUBETEADORA TREIF MOD. TWISAN HD", plantCode: "P4"},
  {code: "R280", name: "Amasadora SIA AM -800", plantCode: "P5"},
  {code: "R291", name: "ETIQUETADORA PA 6000 FOXJET", plantCode: "P3"},
  {code: "R307", name: "SELLADORA DE CAJAS SIAT SM11", plantCode: "P4"},
  {code: "R308", name: "SELLADORA SMIPACK FP 6000", plantCode: "P5"},
  {code: "R310", name: "Transpaleta Manual Jungheinrich", plantCode: "P4"},
  {code: "R315", name: "SUB-ESTACIONES ELECTRICAS", plantCode: "P3"},
  {code: "R316", name: "POWER HEATHER FIBRILADO PH100", plantCode: "P3"},
  {code: "R317", name: "CORTADORA FIBRILADO FLEXICUT", plantCode: "P3"},
  {code: "R320", name: "IQF GYROCOMPACT GC70 JBT EMPANIZADO", plantCode: "P3"},
  {code: "R363", name: "Inyectora Gunther Pi-52", plantCode: "P3"},
  {code: "R376", name: "HORNO/ENFRIADOR SCHROETER HR-IK-16 & KA-IK-16 (PF4)", plantCode: "P4"},
  {code: "R377", name: "HORNO/ENFRIADOR VEMAG THERMOCOMPOUND 8+8", plantCode: "P4"},
  {code: "R380", name: "Afilador de Cuchillos Dick", plantCode: "P4"},
  {code: "R387", name: "Bombas Centrifugas", plantCode: "SDM"},
  {code: "R391", name: "CALDERA FULTON TF-0400CU 2018", plantCode: "SDM"},
  {code: "R398", name: "CALDERA BIOMASA", plantCode: "SDM"},
  {code: "R399", name: "AEROCONDENSADOR TREMESA REDENRING AC-90GB", plantCode: "SDM"},
  {code: "R401", name: "PRENSA DE CARROS CREMINOX PH150", plantCode: "P4"},
  {code: "R402", name: "VOLCADOR ITEC MOD 27200", plantCode: "P4"},
  {code: "R403", name: "PRENSA DE CARROS CREMINOX PHA-2100", plantCode: "P4"},
  {code: "R404", name: "ENVASADORA MULTIVAC R-145", plantCode: "P4"},
  {code: "R415", name: "Molino Triturador Molistick -550 Metalquimia", plantCode: "P4"},
  {code: "R443", name: "VOLCADOR DE TACHOS DM", plantCode: "P4"},
  {code: "R444", name: "MOLEDORA COZZINI MOD.CPG (PF4)", plantCode: "P4"},
  {code: "R445", name: "COZZINI EMULSOR CPF-7 (PF4)", plantCode: "P4"},
  {code: "R446", name: "MEZCLADORA COZZINI CMB2000 (PF4)", plantCode: "P4"},
  {code: "R447", name: "ENVASADORA MULTIVAC B-510", plantCode: "P4"},
  {code: "R448", name: "VOLCADOR BINS CREMINOX  VU1400-EVU2800 (PF4)", plantCode: "P4"},
  {code: "R449", name: "ROBOT YASKAWA MOD. MH180", plantCode: "P4"},
  {code: "R450", name: "Reactor Metalquimia Thermomat 2x", plantCode: "P4"},
  {code: "R451", name: "Reactor Metalquimia 4x", plantCode: "P4"},
  {code: "R452", name: "COZZINI FAST HAM CVMM 6000 (PF4)", plantCode: "P4"},
  {code: "R453", name: "COZZINI FAST HAM CVMM 8000 (PF4)", plantCode: "P4"},
  {code: "R455", name: "TORNILLO ALIMENTADOR COZZINI CSC420", plantCode: "P4"},
  {code: "R456", name: "REACTOR METALQUIMIA 6X", plantCode: "P4"},
  {code: "R457", name: "TUNEL RETRACTILADO MULTIVAC SE-130", plantCode: "P4"},
  {code: "R458", name: "TUNEL DE SECADO MULTIVAC TE-130", plantCode: "P4"},
  {code: "R459", name: "VOLCADOR COZZINI CCD630", plantCode: "P4"},
  {code: "R460", name: "CFS SCANBRINE 3000 (SALMUERA)", plantCode: "P4"},
  {code: "R461", name: "SECADOR DE BOTAS ROSER MOD 11693-27202", plantCode: "P5"},
  {code: "R462", name: "EQUIPO CALENTADOR DE AGUA GIGGI MOD. MAS80", plantCode: "P4"},
  {code: "R463", name: "ANALIZADOR FOSS MOD. MEAT MASTER II", plantCode: "P3"},
  {code: "R464", name: "ENVASADORA MULTIVAC MOD. B-610", plantCode: "P4"},
  {code: "R466", name: "APLICADOR DE HUMO UNITHERM MOD. LQSM", plantCode: "P4"},
  {code: "R467", name: "INYECTORA METALQUIMIA MOD. MOVISTICK 3000 DUPLEX", plantCode: "P4"},
  {code: "R468", name: "CAMPANA EXTRACCION GIROTEC MOD. FCA", plantCode: "SDM"},
  {code: "R469", name: "EMBUTIDORA METALQUIMIA MOD. TWINVAC EVOLUTION", plantCode: "P4"},
  {code: "R471", name: "PREPARADOR SALMUERA METALQUIMIA MOD. BRINMIX 2500", plantCode: "P4"},
  {code: "R472", name: "REACTOR METALQUIMIA MOD. TURBOMEAT 8X", plantCode: "P4"},
  {code: "R473", name: "BRAZO ELEVADOR  DE BLOQUES", plantCode: "P4"},
  {code: "R481", name: "FILTRO METALQUIMIA MOD. FR28", plantCode: "P4"},
  {code: "R484", name: "ENVASADORA MULTIVAC MOD. B-625", plantCode: "P4"},
  {code: "R490", name: "Linea Travaglini", plantCode: "P5"},
  {code: "R502", name: "ROSTIZADOR UNITHERM", plantCode: "P4"},
  {code: "R503", name: "PASTEURIZADOR UNITHERM", plantCode: "P4"},
  {code: "R504", name: "ENVASADORA CAMPANA MULTIVAC C-500 (Jamones)", plantCode: "P4"},
  {code: "R507", name: "CUBETEADORA TREIF FELIX 100S", plantCode: "P6"},
  {code: "R508", name: "ENFRIADOR HORIZONTAL AMRISA", plantCode: "P4"},
  {code: "R509", name: "LAVADOR DE MOLDES MIMASA L300E", plantCode: "P4"},
  {code: "R511", name: "LAVADOR DE CARROS MIMASA RE-2500", plantCode: "P4"},
  {code: "R512", name: "LAVADOR DE BINS MIMASA LC-1000", plantCode: "P4"},
  {code: "R514", name: "CHEQUEADOR DE PESO SARTORIUS EWK", plantCode: "P3"},
  {code: "R584", name: "Cortadora Treif Puma Ce-1000 Eb", plantCode: "P3"},
  {code: "R587", name: "CORTADORA DE HUESOS BIRO MOD.3334", plantCode: "P4"},
  {code: "R589", name: "ROSTIZADOR UNITHERM MOD. RFOV", plantCode: "P4"},
  {code: "R600", name: "Detector de Metales", plantCode: "P3"},
  {code: "R601", name: "REBANADORA GROTE 1514-2E (Planta Pizza nueva)", plantCode: "P5"},
  {code: "R602", name: "SISTEMA INTELLIGRATED", plantCode: "CDT"},
  {code: "R603", name: "SISTEMA HILMOT", plantCode: "CDT"},
  {code: "R604", name: "SISTEMA INTRALOX", plantCode: "CDT"},
  {code: "R605", name: "SISTEMA CONTROLES", plantCode: "CDT"},
  {code: "R606", name: "SISTEMA MECALUX", plantCode: "CDT"},
  {code: "R607", name: "SISTEMA DATALOGIC", plantCode: "CDT"},
  {code: "R608", name: "SISTEMA NUBE", plantCode: "CDT"},
  {code: "R609", name: "CUBETEADORA TREIF TWISTER", plantCode: "P5"},
  {code: "R611", name: "HORNO DE PIEDRA A GAS ITECA MOD 287", plantCode: "P5"},
  {code: "R612", name: "LAMINADORA ITECA MOD 287", plantCode: "P5"},
  {code: "R613", name: "FERMENTADOR ITECA MOD 287", plantCode: "P5"},
  {code: "R614", name: "CINTAS INTRALOX", plantCode: "P3"},
  {code: "R616", name: "CINTAS TRANSPORTES LINEA ITECA", plantCode: "P5"},
  {code: "R618", name: "PRE HORNO ITECA MOD 287", plantCode: "P5"},
  {code: "R619", name: "AMASADORA DIOSNA MOD 57-193", plantCode: "P5"},
  {code: "R620", name: "CINTA ALINEADORA OVA PROJECTS MOD 546CG", plantCode: "P5"},
  {code: "R621", name: "TERMOFORMADORA ULMA MOD TFS700", plantCode: "P5"},
  {code: "R622", name: "BOMBA GRACO MOD SANIFORCE", plantCode: "P5"},
  {code: "R623", name: "Vitrinas Exhibidoras", plantCode: "P5"},
  {code: "R624", name: "CARGADOR PIZZA ULMA MOD 6533120", plantCode: "P5"},
  {code: "R625", name: "CINTAS TRANSPORTES LINEA ULMA", plantCode: "P5"},
  {code: "R626", name: "TABLERO ELECTRICO QE700", plantCode: "P5"},
  {code: "R627", name: "ENVASADORA FLOWPACK ULMA ARTIC", plantCode: "P5"},
  {code: "R628", name: "DOSIFICADORA OVA PROJECTS MOD 546 DT", plantCode: "P5"},
  {code: "R629", name: "DOSIFICADORA MULTI-INYECCION 4 V\u00cdAS OVA PROJECTS MOD 546DD", plantCode: "P5"},
  {code: "R631", name: "ESTACION LAVADO OVA PROJECTS SERIE 546EL", plantCode: "P5"},
  {code: "R632", name: "ESTACION MEZCLADOR DE TOMATE OVA PROJECTS MOD 576EA", plantCode: "P5"},
  {code: "R633", name: "CINTA 4 a2 VIAS OVA PROJECTS MOD 546CF", plantCode: "P5"},
  {code: "R634", name: "CINTAS TRANSPOSTADORAS PVC LINEA OVA PROJECTS 546CA y 546CAV", plantCode: "P5"},
  {code: "R636", name: "CINTA ESPRAYADORA OVA PROJECTS MOD 546CH", plantCode: "P5"},
  {code: "R637", name: "TUNEL TERMORETRACTIL ULMA MOD TR-300", plantCode: "P5"},
  {code: "R638", name: "ENCAJADORA RAMA MOD RM W 02", plantCode: "P5"},
  {code: "R639", name: "ESTUCHADORA RAMA MOD RM A3C", plantCode: "P5"},
  {code: "R640", name: "ROBOT DISTRIBUIDOR 1 A 3 LM SPA MOD 200", plantCode: "P5"},
  {code: "R641", name: "TABLERO ELECTRICO CP", plantCode: "P5"},
  {code: "R642", name: "TABLERO ELECTRICO OVA", plantCode: "P5"},
  {code: "R643", name: "RALLADOR DE QUESO URSCHEL MOD CC-D 6488", plantCode: "P5"},
  {code: "R644", name: "DIVISORA Y BOLEADORA WP BAKERY TECHNOLOGICS MOD TWS", plantCode: "P5"},
  {code: "R645", name: "CUBETEADORA QUESO GROBA MOD SIGMA RB-300", plantCode: "P5"},
  {code: "R646", name: "SISTEMA DE AGUA FRIA-CALIENTE FAMINOX", plantCode: "SDM"},
  {code: "R647", name: "CINTA DE CARGA OVA PROJECTS MOD 546FJ", plantCode: "P5"},
  {code: "R648", name: "CINTA CURVA ENTRADA FREEZER OVA PROJECTS MOD 579CE", plantCode: "P5"},
  {code: "R650", name: "PRENSADOR ITECA MOD.287", plantCode: "P5"},
  {code: "R651", name: "HARINADORA ITECA 2016 ITALIA", plantCode: "P5"},
  {code: "R653", name: "SILOS TELA-METALICO TECHNOSILOS 2016", plantCode: "P5"},
  {code: "R654", name: "CERNIDOR HARINA MOD.BIP2V TECHNOSILOS 2016", plantCode: "P5"},
  {code: "R655", name: "ACONDICIONADOR FERMENTADOR ITECA", plantCode: "P5"},
  {code: "R656", name: "DETECTOR DE METALES ANRITSU MOD. KD", plantCode: "P5"},
  {code: "R658", name: "MONTA CARGA SCHINDLER", plantCode: "P5"},
  {code: "R661", name: "FORMADORA ITECA MOD. 287", plantCode: "P5"},
  {code: "R662", name: "BOLEADORA WERNER MOD. CCR 59", plantCode: "P5"},
  {code: "R663", name: "DIVISORA WERNER", plantCode: "P5"},
  {code: "R664", name: "PRE HORNO ITECA LINEA FAMILIAR", plantCode: "P5"},
  {code: "R666", name: "ENVASADORA MULTICABEZAL MULTIWEIGH MOD. MW XV", plantCode: "P3"},
  {code: "R667", name: "ENVASADORA VERTICAL ULMA MOD. VTC 840", plantCode: "P3"},
  {code: "R668", name: "DIVISORA DE MASA VEMAG MOD. VDD807", plantCode: "P5"},
  {code: "R669", name: "CHEQUEADOR DE PESO VEMAG MOD. 715", plantCode: "P4"},
  {code: "R670", name: "CINTA RETRACTIL IZQUIERDA VEMAG MOD. SCL363", plantCode: "P4"},
  {code: "R671", name: "ROBOT FANUC SANDWICH MOD LR-10 I A/10", plantCode: "P6"},
  {code: "R706", name: "ETIQUETADORA RAVENWOOD MOD. NOBAC500", plantCode: "P6"},
  {code: "R707", name: "DESMECHADORA FINOVA MOD. DESM300", plantCode: "P6"},
  {code: "R708", name: "TUNEL DE SECADO MULTIVAC MOD. TE-120", plantCode: "P6"},
  {code: "R710", name: "PRENSA PAVAN MOD. GE.95/D300", plantCode: "P6"},
  {code: "R711", name: "LAMINADOR PAVAN MOD. LSCL.540/120", plantCode: "P6"},
  {code: "R712", name: "DISTRIBUIDOR PAVAN MOD. VIBRANTE DV.250/1600", plantCode: "P6"},
  {code: "R713", name: "COCEDOR PAVAN MOD. CV.75/1/3", plantCode: "P6"},
  {code: "R714", name: "PENNAUT PAVAN MOD. TAGLIAPENNE", plantCode: "P6"},
  {code: "R715", name: "FORMADORA DE PASTA PAVAN MOD. FORMATRICE MR.265", plantCode: "P6"},
  {code: "R716", name: "FORMADORA DE PASTA PAVAN MOD. RAVIOLATRICE RR.150", plantCode: "P6"},
  {code: "R717", name: "GRUPO DE CORTE PAVAN MOD. TAGLIERINA TL.600", plantCode: "P6"},
  {code: "R718", name: "RELLENADOR CANELONES PAVAN MOD. POMPA DOSAGGIO RIPIENO PRL.140", plantCode: "P6"},
  {code: "R720", name: "DOSIFICADOR DE TOMATE LEONHARDT MOD. TGS-1", plantCode: "P6"},
  {code: "R721", name: "DOSIFICADOR DE QUESO  KORTLEVER", plantCode: "P6"},
  {code: "R722", name: "ENVASADORA SEALPAC MOD. AS-RS", plantCode: "P6"},
  {code: "R725", name: "MEZCLADORA FINOVA MOD. 1CVV60B", plantCode: "P6"},
  {code: "R726", name: "SILOS DISTRIBUIDOR DE SALSA", plantCode: "P6"},
  {code: "R728", name: "AUTOCLAVE LAGARDE MOD. 2B E", plantCode: "P6"},
  {code: "R732", name: "LAVADOR DE CABEZALES PAVAN MOD. 1R /530M", plantCode: "P6"},
  {code: "R733", name: "DOSIFICADOR DE SOLIDOS LEONHARDT MOD. SDM-E", plantCode: "P6"},
  {code: "R734", name: "ESTUCHADORA KEYMAC MOD. K101S", plantCode: "P6"},
  {code: "R736", name: "TECLE CARRO KITO MOD. NERM020SD-SD", plantCode: "P3"},
  {code: "R737", name: "CUTTER UNIVERSAL MOD. QBO350-4", plantCode: "P6"},
  {code: "R790", name: "PRETRATAMIENTO RILES NIJHUIS", plantCode: "SDM"},
  {code: "R791", name: "UNIDAD FLOTACION DAF NIJHUIS MOD. IPF", plantCode: "SDM"},
  {code: "R793", name: "CINTA AUTOMATICA DAKOTA", plantCode: "P5"},
  {code: "R800", name: "LINEA STORK (CINTAS TRANSPORTADORAS)", plantCode: "P3"},
  {code: "R803", name: "ENHARINADORA STORK", plantCode: "P3"},
  {code: "R804", name: "ROTOCRUMB STORK TRC 630", plantCode: "P3"},
  {code: "R805", name: "APLICADOR BATTER STORK TEM 630", plantCode: "P3"},
  {code: "R807", name: "EMBUTIDORA REX RVF 436", plantCode: "P4"},
  {code: "R809", name: "EMBUTIDORA REX RVF 760", plantCode: "P3"},
  {code: "R810", name: "FORMADORA REVOPORTIONER STORK TRP 630", plantCode: "P3"},
  {code: "R811", name: "SISTEMA LIMPIEZA REVO TRP 630/700", plantCode: "P3"},
  {code: "R812", name: "MEZCLADORA GEA  MOD UNIMIX  V1500", plantCode: "P3"},
  {code: "R813", name: "FORMADORA DE CAJAS TAVIL FRM222", plantCode: "P3"},
  {code: "R814", name: "DISTRIBUIDOR TAVIL DAE030", plantCode: "P3"},
  {code: "R815", name: "LINEAS DE TRANSPORTE TAVIL", plantCode: "P3"},
  {code: "R816", name: "CERRADORA DE CAJAS TAVIL CRD122", plantCode: "P3"},
  {code: "R817", name: "ROBOT (CARGADOR) FANUC M-3IA/6S", plantCode: "P3"},
  {code: "R818", name: "CODIFICADOR VIDEOJET MOD. 1520", plantCode: "P3"},
  {code: "R819", name: "CINTA ANCHA HAMBURGUESA ULMA SERIE 111797", plantCode: "P3"},
  {code: "R820", name: "HORNO JBT MOD. GCO-II-600 TF CCR", plantCode: "P3"},
  {code: "R821", name: "FREIDOR JBT MOD. FRYER M6-7 TFF L-R", plantCode: "P3"},
  {code: "R822", name: "FORMADORA HANDTMANN MOD. FST520", plantCode: "P3"},
  {code: "R823", name: "CINTA DISTRIBUIDORA HAMB. ULMA MOD.DISTRIBUIDOR", plantCode: "P3"},
  {code: "R824", name: "MEZCLADOR GEA MOD.PROMIX 1500", plantCode: "P3"},
  {code: "R825", name: "CINTAS ALIMENTACION HELLINGS MOD.12111", plantCode: "P3"},
  {code: "R827", name: "FORMADORA HANDTMANN MOD. FS510", plantCode: "P3"},
  {code: "R828", name: "CODIFICADOR TTO VIDEOJET MOD. DATAFLEX+", plantCode: "P3"},
  {code: "R845", name: "ROBOT PALETIZADOR FANUC MOD. M-2000IiC", plantCode: "P3"},
  {code: "R846", name: "GENERADORA DE HIELO MAJA MOD. SAH3000", plantCode: "SDM"},
  {code: "R850", name: "CFS MOLEDORA AUTOGRIND 280", plantCode: "P3"},
  {code: "R851", name: "CFS MEZCLADORA COMBIGRIND 1500", plantCode: "P3"},
  {code: "R852", name: "JBT GYROCOMPACT M6 (Congelador Espiral 1)", plantCode: "P3"},
  {code: "R854", name: "ENVASADORA FLOWPACK ULMA ATLANTA E", plantCode: "P3"},
  {code: "R856", name: "TUNEL ESPIRAL IQF AEROFREEZE (HAMBURGUESA)", plantCode: "P3"},
  {code: "R857", name: "FLOW PACK VERTICAL ULMA VTI 500", plantCode: "P3"},
  {code: "R859", name: "MEZCLADOR JBT MOD.PROMIX", plantCode: "P3"},
  {code: "R861", name: "TUNEL ESPIRAL JBT GYROCOMPACT MOD. GCM7", plantCode: "P5"},
  {code: "R862", name: "CODIFICADOR LASER MACSA MOD. K-1030 PLUS", plantCode: "P3"},
  {code: "R863", name: "ENVASADORA ULMA MOD. ATLANTA CX", plantCode: "P3"},
  {code: "R864", name: "LAVADORA DE AGUJAS METALQUIMIA MOD. NEEDLECLEAN STD", plantCode: "P4"},
  {code: "R880", name: "BOLEADORA PIETROBERTO", plantCode: "P5"},
  {code: "R881", name: "HORNO ITECA", plantCode: "P5"},
  {code: "R882", name: "REBANADORA GROTE 1515-E (Pepperoni Pizza)", plantCode: "P5"},
  {code: "R883", name: "DOSIFICADOR TOMATE (OVA PROJECT)", plantCode: "P5"},
  {code: "R884", name: "FERMENTADOR CELL ALS31S (SOBRE RUEDAS)", plantCode: "P5"},
  {code: "R885", name: "AMASADORA ESPIRAL EASY80 PIETROBESTO", plantCode: "P5"},
  {code: "R886", name: "REBANADORA GROTE 2530-E", plantCode: "P3"},
  {code: "R887", name: "TABLERO ELECTRICO ITECA", plantCode: "P5"},
  {code: "R888", name: "DETECTOR DE SELLADO VIEWTECH MOD.VT", plantCode: "P5"},
  {code: "R999", name: "Item Sin Maquina Asignada", plantCode: "LU"},
  {code: "R999FU", name: "Item Sin Maquina Asignada", plantCode: "FU"},
];

const PLANTS_META_DATA = {
  P3:  { name: "Planta 3",    bodega: "300", color: "#2563eb", bg: "#eff6ff", active: true },
  P4:  { name: "Planta 4",    bodega: "300", color: "#166534", bg: "#f0fdf4", active: true },
  P5:  { name: "Planta 5",    bodega: "400", color: "#6b21a8", bg: "#faf5ff", active: true },
  P6:  { name: "Planta 6",    bodega: "300", color: "#9a3412", bg: "#fff7ed", active: true },
  SDM: { name: "SADEMA",      bodega: "300", color: "#155e75", bg: "#ecfeff", active: true },
  CDT: { name: "CDT",         bodega: "400", color: "#3f6212", bg: "#f7fee7", active: true },
  LU:  { name: "Lubricantes", bodega: "302", color: "#92400e", bg: "#fffbeb", active: true },
  FU:  { name: "Fungibles",   bodega: "330", color: "#b91c1c", bg: "#fef2f2", active: true },
};

// Fixed display order for plants — unknowns appended alphabetically after
const PLANT_ORDER = ["P3", "P4", "P5", "P6", "SDM", "CDT", "LU", "FU"];
function sortedPlantEntries(meta) {
  return Object.entries(meta).sort(([a], [b]) => {
    const ai = PLANT_ORDER.indexOf(a), bi = PLANT_ORDER.indexOf(b);
    if (ai === -1 && bi === -1) return a.localeCompare(b);
    if (ai === -1) return 1;
    if (bi === -1) return -1;
    return ai - bi;
  });
}

// ─── Mock data ────────────────────────────────────────────────────────────────


const INITIAL_INV = {}; // Start clean — inventory loaded via CSV import

// ─── Utils ────────────────────────────────────────────────────────────────────
const fmtCLP = v => new Intl.NumberFormat("es-CL", { style: "currency", currency: "CLP", maximumFractionDigits: 0 }).format(v);
const fmtN = v => new Intl.NumberFormat("es-CL").format(v);
const partVal = p => (p.physicalQty !== null ? p.physicalQty : p.systemQty) * p.unitValue;
// Pareto axis label: R. + first 5 chars after the first dot (or first 6 chars if no dot)
const fmtParetoCode = code => {
  if (!code) return "";
  const dot = code.indexOf(".");
  if (dot === -1) return code.slice(0, 6);
  return "R." + code.slice(dot + 1, dot + 6).replace(/\.$/, "");
};
// Resolve current display name from users state; falls back to stored displayName
const resolveUser = (audit, users) => {
  if (!audit) return "";
  if (audit.userId && users) {
    const u = users.find(x => x.id === audit.userId);
    if (u) return `${u.nombre} ${u.apellido}`;
  }
  return audit.user || audit.displayName || "";
};
const ROLES = ["Administrador", "Supervisor", "Auditor"];
const partDiff = p => p.physicalQty !== null ? p.physicalQty - p.systemQty : 0;

// ─── Styles ───────────────────────────────────────────────────────────────────
const S = {
  card: { background: "#fff", border: "1px solid #e5e7eb", borderRadius: 12, padding: "16px 20px" },
  badge: (color, bg) => ({ background: bg, color, borderRadius: 6, padding: "2px 8px", fontSize: 11, fontWeight: 600, display: "inline-block" }),
  btn: (variant = "secondary") => ({
    border: variant === "primary" ? "none" : "1px solid #d1d5db",
    background: variant === "primary" ? "#2563eb" : variant === "danger" ? "#fef2f2" : "#fff",
    color: variant === "primary" ? "#fff" : variant === "danger" ? "#dc2626" : "#374151",
    borderRadius: 8, padding: "8px 14px", fontSize: 13, fontWeight: 500, cursor: "pointer",
    display: "inline-flex", alignItems: "center", gap: 6,
  }),
  input: { border: "1px solid #d1d5db", borderRadius: 8, padding: "8px 12px", fontSize: 13, width: "100%", boxSizing: "border-box", outline: "none" },
  th: { padding: "10px 12px", fontSize: 11, fontWeight: 600, color: "#6b7280", textTransform: "uppercase", letterSpacing: "0.05em", textAlign: "left", borderBottom: "1px solid #e5e7eb", background: "#f9fafb" },
  td: { padding: "10px 12px", fontSize: 13, color: "#374151", borderBottom: "1px solid #f3f4f6" },
};

// ─── Icons (inline SVG) ───────────────────────────────────────────────────────
const Icon = ({ name, size = 16, color = "currentColor" }) => {
  const paths = {
    dashboard: "M3 3h7v7H3V3zm11 0h7v7h-7V3zm0 11h7v7h-7v-7zM3 14h7v7H3v-7z",
    plant: "M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5",
    upload: "M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M17 8l-5-5-5 5M12 3v12",
    verify: "M9 11l3 3L22 4M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11",
    history: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z",
    settings: "M12 15a3 3 0 100-6 3 3 0 000 6zM19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z",
    chevronRight: "M9 18l6-6-6-6",
    check: "M20 6L9 17l-5-5",
    alert: "M12 9v4m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z",
    search: "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z",
    save: "M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h11l5 5v11a2 2 0 01-2 2zM17 21v-8H7v8M7 3v5h8",
    x: "M18 6L6 18M6 6l12 12",
    file: "M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6zM14 2v6h6",
    edit: "M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z",
    trash: "M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6",
    package: "M16.5 9.4l-9-5.19M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16zM3.27 6.96L12 12.01l8.73-5.05M12 22.08V12",
    audit: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4",
    list: "M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01",
    plus: "M12 5v14M5 12h14",
    users: { paths: ["M2 21a8 8 0 0113.292-6", "M19 16v6", "M22 19h-6"], circle: { cx: 10, cy: 8, r: 5 } },
    shieldCheck: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10zM9 12l2 2 4-4",
  };
  const def = paths[name];
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {def && typeof def === "object" && def.paths
        ? <>
            {def.paths.map((d, i) => <path key={i} d={d} />)}
            {def.circle && <circle cx={def.circle.cx} cy={def.circle.cy} r={def.circle.r} />}
          </>
        : <path d={def || ""} />
      }
    </svg>
  );
};

// ─── Persistence (IndexedDB) ───────────────────────────────────────────────
// Database: pf-stock-db | Store: app-state | Key: main
var PF_DB_NAME = "pf-stock-db";
var PF_DB_VERSION = 2; // v2: store renamed "state"->"app-state", key renamed "app-state"->"main"
var PF_STORE = "app-state";
var PF_STATE_KEY = "main";
var PF_STORE_LEGACY = "state";
var PF_STATE_KEY_LEGACY = "app-state";
var PF_SCHEMA_VERSION = 1;

function pfIdbOpen() {
  return new Promise(function (resolve, reject) {
    if (!("indexedDB" in window)) { reject(new Error("IndexedDB unavailable")); return; }
    var req = indexedDB.open(PF_DB_NAME, PF_DB_VERSION);
    req.onupgradeneeded = function (event) {
      var db = req.result;
      var tx = req.transaction;

      function ensureNewStore() {
        if (!db.objectStoreNames.contains(PF_STORE)) db.createObjectStore(PF_STORE);
      }

      // Migrate any pre-existing record from the old store/key names so
      // upgrading installs never lose already-persisted data.
      if (event.oldVersion < 2 && db.objectStoreNames.contains(PF_STORE_LEGACY)) {
        var legacyGet = tx.objectStore(PF_STORE_LEGACY).get(PF_STATE_KEY_LEGACY);
        legacyGet.onsuccess = function () {
          ensureNewStore();
          if (legacyGet.result !== undefined) {
            tx.objectStore(PF_STORE).put(legacyGet.result, PF_STATE_KEY);
          }
          if (db.objectStoreNames.contains(PF_STORE_LEGACY)) {
            db.deleteObjectStore(PF_STORE_LEGACY);
          }
        };
        legacyGet.onerror = function () { ensureNewStore(); };
      } else {
        ensureNewStore();
      }
    };
    req.onsuccess = function () { resolve(req.result); };
    req.onerror = function () { reject(req.error); };
  });
}

function pfIdbGet(key) {
  return pfIdbOpen().then(function (db) {
    return new Promise(function (resolve, reject) {
      var tx = db.transaction(PF_STORE, "readonly");
      var req = tx.objectStore(PF_STORE).get(key);
      req.onsuccess = function () { resolve(req.result); };
      req.onerror = function () { reject(req.error); };
    });
  });
}

function pfIdbSet(key, value) {
  return pfIdbOpen().then(function (db) {
    return new Promise(function (resolve, reject) {
      var tx = db.transaction(PF_STORE, "readwrite");
      tx.objectStore(PF_STORE).put(value, key);
      tx.oncomplete = function () { resolve(); };
      tx.onerror = function () { reject(tx.error); };
    });
  });
}

function pfIdbDelete(key) {
  return pfIdbOpen().then(function (db) {
    return new Promise(function (resolve, reject) {
      var tx = db.transaction(PF_STORE, "readwrite");
      tx.objectStore(PF_STORE).delete(key);
      tx.oncomplete = function () { resolve(); };
      tx.onerror = function () { reject(tx.error); };
    });
  });
}

// Public persistence API (IndexedDB only — no backend, no localStorage).
function loadState() {
  return pfIdbGet(PF_STATE_KEY);
}
function saveState(state) {
  return pfIdbSet(PF_STATE_KEY, state);
}
function clearState() {
  return pfIdbDelete(PF_STATE_KEY);
}

// Migrates a persisted payload to the current schema. Add cases keyed off
// data.schemaVersion here if PF_SCHEMA_VERSION is ever bumped; unknown or
// missing fields fall back to safe defaults so a corrupt/partial record
// never blocks app startup.
function pfMigrate(data) {
  if (!data || typeof data !== "object") return null;
  return {
    schemaVersion: PF_SCHEMA_VERSION,
    inv: data.inv || {},
    history: data.history || [],
    audits: data.audits || [],
    subfamilies: data.subfamilies || SUBFAMILIES_DATA,
    plantsMeta: data.plantsMeta || PLANTS_META_DATA,
    users: data.users || []
  };
}

// Validates that a parsed backup JSON has the minimum required shape before
// it's ever applied to app state. Used by Settings > Import Backup.
function pfValidateBackup(data) {
  if (!data || typeof data !== "object") return false;
  if (typeof data.inv !== "object" || data.inv === null) return false;
  if (!Array.isArray(data.history)) return false;
  if (!Array.isArray(data.audits)) return false;
  if (!Array.isArray(data.subfamilies)) return false;
  if (typeof data.plantsMeta !== "object" || data.plantsMeta === null) return false;
  if (!Array.isArray(data.users)) return false;
  return true;
}

// ─── App ──────────────────────────────────────────────────────────────────────
function App() {
  const [inv, setInv] = useState(INITIAL_INV);
  const [history, setHistory] = useState([]);
  const [audits, setAudits] = useState([]);
  const [subfamilies, setSubfamilies] = useState(SUBFAMILIES_DATA);
  const [plantsMeta, setPlantsMeta] = useState(PLANTS_META_DATA);
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState("dashboard");
  const [plantSel, setPlantSel] = useState(null);
  const [sfSel, setSfSel] = useState(null);
  const [alert, setAlert] = useState(null); // { msg, type }
  const [lastSaved, setLastSaved] = useState(new Date());

  const isDesktop = typeof window !== "undefined" && window.innerWidth >= 1024;
  const [wide, setWide] = useState(typeof window !== "undefined" && window.innerWidth >= 1024);
  const [mid, setMid] = useState(typeof window !== "undefined" && window.innerWidth >= 640);

  useEffect(() => {
    const fn = () => { setWide(window.innerWidth >= 1024); setMid(window.innerWidth >= 640); };
    window.addEventListener("resize", fn);
    return () => window.removeEventListener("resize", fn);
  }, []);

  // Scroll to top on every view/navigation change
  useEffect(() => { window.scrollTo(0, 0); }, [page, plantSel, sfSel]);

  // Autosave
  useEffect(() => {
    const t = setInterval(() => setLastSaved(new Date()), 30000);
    return () => clearInterval(t);
  }, []);

  // ─── Persistence: load once on mount, before any save can occur ───────────
  const [hydrated, setHydrated] = useState(false);
  const saveTimerRef = useRef(null);

  useEffect(() => {
    let cancelled = false;
    loadState()
      .then((raw) => {
        if (cancelled) return;
        const migrated = pfMigrate(raw);
        if (migrated) {
          setInv(migrated.inv);
          setHistory(migrated.history);
          setAudits(migrated.audits);
          setSubfamilies(migrated.subfamilies);
          setPlantsMeta(migrated.plantsMeta);
          setUsers(migrated.users);
        }
      })
      .catch((err) => {
        console.warn("[PF Stock] persistence load failed, starting empty:", err);
      })
      .finally(() => { if (!cancelled) setHydrated(true); });
    return () => { cancelled = true; };
  }, []);

  // ─── Persistence: debounced save after hydration, on relevant state change ─
  useEffect(() => {
    if (!hydrated) return;
    if (saveTimerRef.current) clearTimeout(saveTimerRef.current);
    saveTimerRef.current = setTimeout(() => {
      saveState({
        schemaVersion: PF_SCHEMA_VERSION,
        inv, history, audits, subfamilies, plantsMeta, users
      }).catch((err) => console.warn("[PF Stock] persistence save failed:", err));
    }, 400);
    return () => clearTimeout(saveTimerRef.current);
  }, [hydrated, inv, history, audits, subfamilies, plantsMeta, users]);

  const showToast = useCallback((msg, type = "success") => {
    setAlert({ msg, type });
  }, []);

  const parts = useMemo(() => Object.values(inv), [inv]);
  const totalVal = useMemo(() => parts.reduce((s, p) => s + partVal(p), 0), [parts]);
  const verifiedCount = useMemo(() => parts.filter(p => p.verified).length, [parts]);
  const diffCount = useMemo(() => parts.filter(p => p.physicalQty !== null && p.physicalQty !== p.systemQty).length, [parts]);

  function handleVerify(id, checked) {
    setInv(inv => {
      const p = inv[id];
      return { ...inv, [id]: { ...p, verified: checked, physicalQty: checked && p.physicalQty === null ? p.systemQty : p.physicalQty } };
    });
  }

  function handlePhysQty(id, val) {
    setInv(inv => ({ ...inv, [id]: { ...inv[id], physicalQty: val === "" ? null : Number(val), verified: false } }));
  }

  // Parse a file (CSV/TSV/TXT or XLSX/XLS) → Promise<{rows: string[][]}>
  function parseFile(file) {
    return new Promise((resolve, reject) => {
      const isExcel = /\.(xlsx|xls)$/i.test(file.name);
      if (isExcel) {
        const r = new FileReader();
        r.onerror = () => reject(new Error(`No se pudo leer ${file.name}`));
        r.onload = e => {
          try {
            const XLSX = window.XLSX || (typeof require !== 'undefined' ? require('xlsx') : null);
            if (!XLSX) throw new Error('Librería Excel no disponible');
            const wb = XLSX.read(e.target.result, { type: 'array' });
            const ws = wb.Sheets[wb.SheetNames[0]];
            const data = XLSX.utils.sheet_to_json(ws, { header: 1, defval: '' });
            resolve({ rows: data.map(row => row.map(c => String(c ?? '').trim())) });
          } catch (err) { reject(err); }
        };
        r.readAsArrayBuffer(file);
      } else {
        const r = new FileReader();
        r.onerror = () => reject(new Error(`No se pudo leer ${file.name}`));
        r.onload = e => {
          const lines = e.target.result.split(/\r?\n/).filter(l => l.trim());
          const rows = lines.map(l => l.split(/[;,|\t]/).map(c => c.trim()));
          resolve({ rows });
        };
        r.readAsText(file);
      }
    });
  }

  // ── Import row parser ─────────────────────────────────────────────────────
  // Format: codigo(0) nombre(1) cantidad(2) valor(3) subfamilia(4) bodega(5)
  function parseImportRows(dataRows, sfLookup) {
    const newParts       = {};
    const byPlant        = {};
    let   imported       = 0;
    let   skippedZero    = 0;
    let   skippedBodega  = 0;  // invalid bodega for R-999
    const skippedSfs     = new Set();

    // bodega → planta mapping for R-999
    const R999_BODEGA = { '302': 'LU', '330': 'FU' };

    dataRows.forEach((cols, i) => {
      // Step 1: normalize
      const code   = String(cols[0] || '').trim().toUpperCase() || `IMP${i}`;
      const name   = String(cols[1] || `Repuesto ${i + 1}`).trim();
      const qty    = parseFloat(cols[2]);
      const uv     = parseFloat(cols[3]) || 0;
      const rawSf  = String(cols[4] || '').trim().toUpperCase();
      const bodega = String(cols[5] || '').trim();

      // Step 2: skip cantidad = 0
      if (!qty || qty <= 0) { skippedZero++; return; }

      // Step 3: subfamilia must exist
      const sf = rawSf ? sfLookup[rawSf] : null;
      if (!sf) { skippedSfs.add(rawSf || '(vacío)'); return; }

      // Step 4: determine plantCode and subfamilyCode
      // Normalize R-999 variants: R-999 / R999 / R999FU all trigger bodega routing
      const isR999 = rawSf === 'R999' || rawSf === 'R-999' || rawSf === 'R999FU';
      let plantCode = sf.plantCode;
      let subfamilyCode = sf.code;

      if (isR999) {
        // R-999 family: plant AND subfamily determined by bodega
        const mapped = R999_BODEGA[String(bodega).trim()];
        if (!mapped) { skippedBodega++; return; }
        plantCode = mapped;
        // Each plant has its own subfamily code: LU→R999, FU→R999FU
        subfamilyCode = plantCode === 'FU' ? 'R999FU' : 'R999';
      } else if (plantCode === 'LU' || plantCode === 'FU') {
        // Other shared subfamilias: codigo prefix wins
        const prefix = code.charAt(0);
        if (prefix === 'L') plantCode = 'LU';
        else if (prefix === 'F') plantCode = 'FU';
        // else keep sf.plantCode
      }

      // Step 5: build part
      const id = `IMP-${plantCode}-${code}`;
      newParts[id] = { id, code, name, subfamilyCode, plantCode, systemQty: qty, physicalQty: null, unitValue: uv, unit: 'UN', verified: false, uploadDate: new Date().toISOString() };
      if (!byPlant[plantCode]) byPlant[plantCode] = { items: 0, val: 0 };
      byPlant[plantCode].items++;
      byPlant[plantCode].val += qty * uv;
      imported++;
    });

    return { newParts, byPlant, imported, skippedZero, skippedBodega, skippedSfs };
  }

  function importSummaryMsg(imported, skippedZero, skippedBodega, skippedSfs) {
    const parts = [];
    if (skippedZero > 0)     parts.push(`${skippedZero} con cantidad=0`);
    if (skippedBodega > 0)   parts.push(`${skippedBodega} R-999 sin bodega válida`);
    if (skippedSfs.size > 0) parts.push(`${skippedSfs.size} subfamilia(s) no encontrada(s): ${[...skippedSfs].join(', ')}`);
    return parts.length ? ` · Omitidas: ${parts.join(' · ')}` : '';
  }

  function handleUpload(files, plantCode) {
    // sf lookup: full lookup so R-999/bodega routing works correctly
    const sfLookupPlant = {};
    subfamilies.forEach(s => { sfLookupPlant[s.code.trim().toUpperCase()] = { code: s.code, plantCode: s.plantCode }; });

    Array.from(files).forEach(file => {
      parseFile(file).then(({ rows }) => {
        const dataRows = rows.slice(1).filter(cols => cols.length >= 5 && String(cols[0] || '').trim());
        if (dataRows.length === 0) {
          showToast(`${file.name}: sin datos válidos. Formato esperado: codigo;nombre;cantidad;valor;subfamilia;bodega`, 'error');
          return;
        }

        const { newParts, byPlant, imported, skippedZero, skippedBodega, skippedSfs } = parseImportRows(dataRows, sfLookupPlant);

        // M4 fix: filter to target plant only — cross-plant rows are counted and skipped
        const plantParts = Object.fromEntries(Object.entries(newParts).filter(([, p]) => p.plantCode === plantCode));
        const skippedOtherPlant = imported - Object.keys(plantParts).length;
        const plantImported = Object.keys(plantParts).length;
        const plantVal = Object.values(plantParts).reduce((s, p) => s + p.systemQty * p.unitValue, 0);

        // Replace existing inv for this plant only, add filtered parts
        setInv(prev => {
          const cleaned = Object.fromEntries(Object.entries(prev).filter(([, p]) => p.plantCode !== plantCode));
          return { ...cleaned, ...plantParts };
        });

        setHistory(h => [{
          id: Date.now(), fileName: file.name, plantCode,
          plantName: plantsMeta[plantCode]?.name || plantCode,
          date: new Date().toISOString(), items: plantImported, value: plantVal,
        }, ...h]);

        const suffix = importSummaryMsg(plantImported, skippedZero, skippedBodega, skippedSfs);
        const crossMsg = skippedOtherPlant > 0 ? ` · ${skippedOtherPlant} filas de otra planta ignoradas` : '';
        const hasWarn = skippedSfs.size > 0 || skippedBodega > 0 || skippedOtherPlant > 0;
        showToast(`${file.name}: ${plantImported} repuestos importados${suffix}${crossMsg}`, hasWarn ? 'warning' : 'success');
      }).catch(err => showToast(`${file.name}: ${err.message}`, 'error'));
    });
  }

  function handleGlobalUpload(files) {
    // sf lookup: normalized code → { code, plantCode }
    const sfLookup = {};
    subfamilies.forEach(s => { sfLookup[s.code.trim().toUpperCase()] = { code: s.code, plantCode: s.plantCode }; });

    Array.from(files).forEach(file => {
      parseFile(file).then(({ rows }) => {
        const dataRows = rows.slice(1).filter(cols => cols.length >= 5 && String(cols[0] || '').trim());
        if (dataRows.length === 0) {
          showToast(`${file.name}: sin datos válidos. Formato esperado: codigo;nombre;cantidad;valor;subfamilia;bodega`, 'error');
          return;
        }

        const { newParts, byPlant, imported, skippedZero, skippedBodega, skippedSfs } = parseImportRows(dataRows, sfLookup);

        // Replace inv for all affected plants
        setInv(prev => {
          const incomingPlants = new Set(Object.values(newParts).map(p => p.plantCode));
          const cleaned = Object.fromEntries(Object.entries(prev).filter(([, p]) => !incomingPlants.has(p.plantCode)));
          return { ...cleaned, ...newParts };
        });

        const ts = Date.now();
        const histEntries = Object.entries(byPlant).map(([pc, { items, val }], idx) => ({
          id: ts + idx, fileName: file.name, plantCode: pc,
          plantName: plantsMeta[pc]?.name || pc,
          date: new Date().toISOString(), items, value: val,
        }));
        setHistory(h => [...histEntries, ...h]);

        const plantCount = Object.keys(byPlant).length;
        const suffix = importSummaryMsg(imported, skippedZero, skippedBodega, skippedSfs);
        const type   = (skippedSfs.size > 0 || skippedBodega > 0) ? 'warning' : 'success';
        showToast(`${file.name}: ${imported} repuestos importados en ${plantCount} planta(s)${suffix}`, type);
      }).catch(err => showToast(`${file.name}: ${err.message}`, 'error'));
    });
  }


  function handleSaveAudit(plantCode, plantParts, user = "Usuario", auditDate, sfCode, sfName, userId = null, status = "Completado", replaceDraftId = null) {
    const verified = plantParts.filter(p => p.verified).length;
    const diffs = plantParts.filter(p => p.physicalQty !== null && p.physicalQty !== p.systemQty).length;
    const value = plantParts.reduce((s, p) => s + partVal(p), 0);
    const snapshot = plantParts.map(p => ({
      id: p.id, code: p.code, name: p.name, subfamilyCode: p.subfamilyCode,
      systemQty: p.systemQty, physicalQty: p.physicalQty, unitValue: p.unitValue,
      unit: p.unit, verified: p.verified,
      diff: p.physicalQty !== null ? p.physicalQty - p.systemQty : null,
    }));
    const newAudit = {
      id: Date.now(),
      date: auditDate ? new Date(auditDate + "T12:00:00").toISOString() : new Date().toISOString(),
      user,
      userId,
      plantCode,
      plantName: plantsMeta[plantCode]?.name || plantCode,
      sfCode: sfCode || null,
      sfName: sfName || null,
      totalItems: plantParts.length,
      verifiedItems: verified,
      diffItems: diffs,
      totalValue: value,
      status,
      snapshot,
    };
    setAudits(a => {
      if (replaceDraftId) {
        // Replace the existing draft record in-place (preserve position) — only if still Borrador
        return a.map(x => (x.id === replaceDraftId && x.status === "Borrador") ? { ...newAudit, id: replaceDraftId } : x);
      }
      return [newAudit, ...a];
    });
    showToast(`Auditoría guardada — ${status}`);
  }

  function handleDeleteAudit(id) {
    setAudits(prev => {
      const target = prev.find(x => x.id === id);
      const remaining = prev.filter(x => x.id !== id);

      if (target?.snapshot?.length) {
        // Build set of part IDs still covered by any remaining audit
        const coveredIds = new Set(remaining.flatMap(a => (a.snapshot || []).map(p => p.id)));

        // Roll back inv for parts no longer covered by any audit
        setInv(inv => {
          const next = { ...inv };
          target.snapshot.forEach(p => {
            if (!coveredIds.has(p.id) && next[p.id]) {
              next[p.id] = { ...next[p.id], verified: false, physicalQty: null };
            }
          });
          return next;
        });
      }

      return remaining;
    });
    showToast("Auditoría eliminada");
  }

  function handleUpdateAuditDate(id, newDateISO) {
    setAudits(prev => prev.map(a =>
      a.id === id && a.status === "Borrador"
        ? { ...a, date: new Date(newDateISO + "T12:00:00").toISOString() }
        : a
    ));
  }

  const [confirmReset, setConfirmReset] = useState(false);

  function resetData() {
    setConfirmReset(true);
  }

  function doReset() {
    setInv(INITIAL_INV); setHistory([]); setAudits([]); setConfirmReset(false); setPage("dashboard"); setPlantSel(null); setSfSel(null); showToast("Datos reiniciados");
  }

  function handleDeleteHistory(id) {
    setHistory(h => h.filter(x => x.id !== id));
    showToast("Carga eliminada");
  }

  const navigate = (p, plant = null, sf = null) => { setPage(p); setPlantSel(plant); setSfSel(sf); };

  const navItems = [
    { id: "dashboard", label: "Dashboard", icon: "dashboard" },
    { id: "plants", label: "Plantas", icon: "plant" },
    { id: "settings", label: "Ajustes", icon: "settings" },
  ];

  const pageProps = { inv, setInv, parts, totalVal, verifiedCount, diffCount, history, setHistory, audits, handleSaveAudit, handleDeleteAudit, handleUpdateAuditDate, handleDeleteHistory, navigate, showToast, handleVerify, handlePhysQty, handleUpload, handleGlobalUpload, resetData, plantSel, setPlantSel, sfSel, setSfSel, lastSaved, setLastSaved, subfamilies, setSubfamilies, plantsMeta, setPlantsMeta, users, setUsers };

  if (!hydrated) {
    return (
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100vh", fontFamily: "'Inter', system-ui, sans-serif", color: "#6b7280", fontSize: 14 }}>
        Cargando datos…
      </div>
    );
  }

  return (
    <div style={{ fontFamily: "'Inter', system-ui, sans-serif", minHeight: "100vh", background: "#f9fafb", display: "flex", flexDirection: "column", overflowX: "hidden" }}>
      {/* Desktop sidebar (hidden on mobile via display) */}
      {wide && (
        <aside style={{ width: 220, background: "#fff", borderRight: "1px solid #e5e7eb", display: "flex", flexDirection: "column", position: "fixed", top: 0, left: 0, height: "100vh", zIndex: 20 }}>
          <div style={{ padding: "20px 16px 12px", borderBottom: "1px solid #e5e7eb" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <img src="data:image/png;base64,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" alt="PF" style={{ width: 32, height: 32, borderRadius: 8, objectFit: "contain", background: "transparent" }} />
              <div>
                <div style={{ color: "#111827", fontWeight: 700, fontSize: 14 }}>PF Stock</div>
                <div style={{ color: "#6b7280", fontSize: 11 }}>Repuestos</div>
              </div>
            </div>
          </div>
          <nav style={{ flex: 1, padding: "12px 8px" }}>
            {navItems.map(n => (
              <button key={n.id} onClick={() => navigate(n.id)} style={{ width: "100%", textAlign: "left", display: "flex", alignItems: "center", gap: 10, padding: "9px 10px", borderRadius: 8, border: "none", background: page === n.id ? "#eff6ff" : "transparent", color: page === n.id ? "#1d4ed8" : "#6b7280", cursor: "pointer", marginBottom: 2, fontSize: 13, fontWeight: page === n.id ? 600 : 400, transition: "background 0.15s" }}>
                <Icon name={n.icon} size={16} color={page === n.id ? "#2563eb" : "#9ca3af"} />
                {n.label}
              </button>
            ))}
          </nav>
          <div style={{ padding: "12px 16px", borderTop: "1px solid #e5e7eb", fontSize: 11, color: "#6b7280" }}>
            Guardado {lastSaved.toLocaleTimeString("es-CL", { hour: "2-digit", minute: "2-digit" })}
          </div>
        </aside>
      )}

      {/* Mobile top bar (hidden on desktop) */}
      {!wide && (
        <header style={{ background: "#fff", borderBottom: "1px solid #e5e7eb", padding: "12px 16px", display: "flex", alignItems: "center", justifyContent: "space-between", position: "sticky", top: 0, zIndex: 20 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <img src="data:image/png;base64,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" alt="PF" style={{ width: 28, height: 28, borderRadius: 6, objectFit: "contain", background: "transparent" }} />
            <span style={{ color: "#111827", fontWeight: 700, fontSize: 14 }}>PF Stock</span>
          </div>
        </header>
      )}

      {/* Single PageContent instance — never unmounts on resize */}
      <main style={{ marginLeft: wide ? 220 : 0, flex: 1, width: wide ? "calc(100% - 220px)" : "100%", boxSizing: "border-box", padding: wide ? "24px" : "12px 14px", paddingBottom: wide ? 0 : 72, overflow: "auto" }}>
        <PageContent page={page} {...pageProps} wide={wide} mid={mid} />
      </main>

      {/* Mobile bottom nav (hidden on desktop) */}
      {!wide && (
        <nav style={{ position: "fixed", bottom: 0, left: 0, right: 0, background: "#fff", display: "flex", borderTop: "1px solid #e5e7eb", zIndex: 20 }}>
          {navItems.map(n => (
            <button key={n.id} onClick={() => navigate(n.id)} style={{ flex: 1, border: "none", background: page === n.id ? "#eff6ff" : "none", cursor: "pointer", padding: "8px 4px 10px", display: "flex", flexDirection: "column", alignItems: "center", gap: 3 }}>
              <Icon name={n.icon} size={18} color={page === n.id ? "#2563eb" : "#9ca3af"} />
              <span style={{ fontSize: 9, color: page === n.id ? "#2563eb" : "#9ca3af", fontWeight: page === n.id ? 600 : 400 }}>{n.label.split(" ")[0]}</span>
            </button>
          ))}
        </nav>
      )}

      {confirmReset && <ConfirmDialog title="Reiniciar inventario" message="Se eliminarán todos los datos, auditorías e historial. Esta acción no se puede deshacer." confirmLabel="Reiniciar" danger onConfirm={doReset} onCancel={() => setConfirmReset(false)} />}

      {/* Toast */}
      {alert && (
        <div role="alertdialog" aria-modal="true" aria-label={alert.type === "error" ? "Error" : alert.type === "warning" ? "Advertencia" : "Listo"} onKeyDown={e => { if (e.key === "Escape") setAlert(null); }}
          style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.45)", zIndex: 300, display: "flex", alignItems: "center", justifyContent: "center", padding: 16 }}>
          <div style={{ background: "#fff", borderRadius: 14, padding: "22px 20px", width: "100%", maxWidth: 360, boxShadow: "0 8px 32px rgba(0,0,0,0.18)", overflowY: "auto", maxHeight: "90vh" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
              <div style={{ width: 32, height: 32, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
                background: alert.type === "error" ? "#fef2f2" : alert.type === "warning" ? "#fffbeb" : "#f0fdf4",
              }}>
                <span style={{ fontSize: 16 }}>{alert.type === "error" ? "⚠️" : alert.type === "warning" ? "⚠️" : "✓"}</span>
              </div>
              <div style={{ fontWeight: 700, fontSize: 15, color: "#111827" }}>
                {alert.type === "error" ? "Error" : alert.type === "warning" ? "Advertencia" : "Listo"}
              </div>
            </div>
            <div style={{ fontSize: 13, color: "#374151", lineHeight: 1.55, marginBottom: 18, whiteSpace: "pre-wrap" }}>{alert.msg}</div>
            <button onClick={() => setAlert(null)} style={{ ...S.btn("primary"), width: "100%", justifyContent: "center", background: alert.type === "error" ? "#dc2626" : alert.type === "warning" ? "#b45309" : "#16a34a", border: "none" }}>
              Aceptar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Page Router ──────────────────────────────────────────────────────────────
function PageContent({ page, wide, mid, ...props }) {
  switch (page) {
    case "dashboard": return <DashboardPage wide={wide} {...props} />;
    case "plants": return <PlantsPage wide={wide} {...props} />;
    case "settings": return <SettingsPage wide={wide} {...props} />;
    case "settings-subfamilies": return <SubfamiliesCrudPage wide={wide} {...props} />;
    case "settings-plantas": return <PlantsCrudPage wide={wide} {...props} />;
    case "settings-usuarios": return <UsersCrudPage wide={wide} {...props} />;
    case "settings-roles": return <RolesCrudPage wide={wide} {...props} />;
    default: return null;
  }
}

// ─── Dashboard ────────────────────────────────────────────────────────────────
function DashboardPage({ parts, totalVal, verifiedCount, diffCount, navigate, wide, plantsMeta, audits, subfamilies }) {
  // Subfamily-level audit metrics (same logic as Plant page)
  const sfMetrics = useMemo(() => {
    const latestCompletedBySf = {};
    [...audits].sort((a, b) => new Date(b.date) - new Date(a.date)).forEach(a => {
      if (a.sfCode && a.status === "Completado" && !(a.sfCode in latestCompletedBySf)) {
        latestCompletedBySf[a.sfCode] = a;
      }
    });
    const total    = subfamilies.length;
    const verified = subfamilies.filter(s => latestCompletedBySf[s.code] && latestCompletedBySf[s.code].diffItems === 0).length;
    const diffs    = subfamilies.filter(s => latestCompletedBySf[s.code] && latestCompletedBySf[s.code].diffItems > 0).length;
    const pending  = subfamilies.filter(s => !latestCompletedBySf[s.code]).length;
    const pct      = total ? Math.round(((verified + diffs) / total) * 100) : 0;
    return { total, verified, diffs, pending, pct, latestCompletedBySf };
  }, [audits, subfamilies]);

  const piePlantData = useMemo(() => {
    const { latestCompletedBySf } = sfMetrics;
    return sortedPlantEntries(plantsMeta).filter(([, m]) => m.active).map(([code, meta]) => {
      const plantSfs = subfamilies.filter(s => s.plantCode === code);
      let audited = 0, pending = plantSfs.length;
      plantSfs.forEach(sf => { if (latestCompletedBySf[sf.code]) { audited++; pending--; } });
      const value = parts.filter(p => p.plantCode === code).reduce((s, p) => s + partVal(p), 0);
      const hasDiffs = plantSfs.some(sf => latestCompletedBySf[sf.code] && latestCompletedBySf[sf.code].diffItems > 0);
      return { code, name: meta.name, color: meta.color || "#2563eb", bg: meta.bg || "#eff6ff", total: plantSfs.length, audited, pending, value, hasDiffs };
    });
  }, [sfMetrics, subfamilies, plantsMeta, parts]);

  const kpiTiles = [
    { id: "all",      label: "Valor inventario",  value: fmtCLP(totalVal),            color: "#2563eb", bg: "#eff6ff", border: "#bfdbfe" },
    { id: "pending",  label: "Subfamilias",        value: fmtN(sfMetrics.total),       color: "#374151", bg: "#f9fafb", border: "#e5e7eb" },
    { id: "verified", label: "Auditadas",          value: fmtN(sfMetrics.verified + sfMetrics.diffs), color: "#166534", bg: "#f0fdf4", border: "#bbf7d0", sub: `${sfMetrics.pct}%` },
    { id: "diffs",    label: "Con diferencias",    value: fmtN(sfMetrics.diffs),       color: sfMetrics.diffs > 0 ? "#dc2626" : "#6b7280", bg: sfMetrics.diffs > 0 ? "#fef2f2" : "#f9fafb", border: sfMetrics.diffs > 0 ? "#fecaca" : "#e5e7eb" },
  ];

  return (
    <div>
      <PageHeader title="Dashboard" subtitle="Resumen del inventario de repuestos" />

      {/* KPI cards */}
      <div style={{ display: "grid", gridTemplateColumns: wide ? "repeat(4, 1fr)" : "repeat(2, 1fr)", gap: 12, marginBottom: 20 }}>
        {kpiTiles.map(t => {
          return (
            <div key={t.id} style={{
              background: t.bg, border: `1px solid ${t.border}`,
              borderRadius: 12, padding: "14px 16px",
            }}>
              <div style={{ fontSize: 12, color: "#374151", marginBottom: 4 }}>{t.label}</div>
              <div style={{ fontSize: 22, fontWeight: 700, color: t.color, lineHeight: 1.2 }}>{t.value}</div>
              {t.sub && <div style={{ fontSize: 12, color: t.color, marginTop: 4, opacity: 0.8 }}>{t.sub} completado</div>}
            </div>
          );
        })}
      </div>

      {sfMetrics.diffs > 0 && (
        <div style={{ background: "#fef2f2", border: "1px solid #fecaca", borderRadius: 10, padding: "12px 16px", marginBottom: 20, display: "flex", alignItems: "center", gap: 10 }}>
          <Icon name="alert" size={18} color="#dc2626" />
          <div>
            <div style={{ fontWeight: 600, fontSize: 14, color: "#b91c1c" }}>{sfMetrics.diffs} subfamilia{sfMetrics.diffs > 1 ? "s" : ""} con diferencias en la última auditoría</div>
            <div style={{ fontSize: 12, color: "#b91c1c", marginTop: 2 }}>Revisa las diferencias en el detalle de cada subfamilia.</div>
          </div>
          <button onClick={() => navigate("plants")} style={{ ...S.btn("primary"), marginLeft: "auto", fontSize: 12, padding: "6px 12px" }}>Ver en plantas</button>
        </div>
      )}

      {/* Plant subfamily audit pie charts */}
      <div style={{ ...S.card }}>
          <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 20 }}>Estado por planta</div>
          {piePlantData.length === 0 ? (
            <div style={{ fontSize: 13, color: "#6b7280", textAlign: "center", padding: "16px 0" }}>Sin plantas activas configuradas.</div>
          ) : (
            <div style={{ display: "grid", gridTemplateColumns: wide ? "repeat(4, 1fr)" : "repeat(2, 1fr)", gap: 24 }}>
              {piePlantData.map(p => {
                const auditedPct = p.total ? Math.round((p.audited / p.total) * 100) : 0;
                const donut = p.total
                  ? `conic-gradient(${p.color} 0% ${auditedPct}%, #e5e7eb ${auditedPct}% 100%)`
                  : "#f3f4f6";
                return (
                  <div key={p.code} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}>
                    <div style={{ position: "relative" }}>
                      <div style={{ width: 88, height: 88, borderRadius: "50%", background: donut }} />
                      <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <div style={{ width: 56, height: 56, borderRadius: "50%", background: "#fff", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                          {p.total === 0
                            ? <div style={{ fontSize: 9, color: "#6b7280", textAlign: "center", lineHeight: 1.3 }}>Sin sub-<br/>familias</div>
                            : <>
                                <div style={{ fontSize: 15, fontWeight: 800, color: auditedPct === 100 ? "#16a34a" : p.color, lineHeight: 1 }}>{auditedPct}%</div>
                                <div style={{ fontSize: 9, color: "#6b7280", marginTop: 1 }}>audit.</div>
                              </>
                          }
                        </div>
                      </div>
                    </div>
                    <div style={{ textAlign: "center" }}>
                      <div style={{ fontSize: 12, fontWeight: 700, color: "#111827", marginBottom: p.hasDiffs ? 4 : 6 }}>{p.name}</div>
                      {p.hasDiffs && <span style={{ fontSize: 10, fontWeight: 600, color: "#b91c1c", background: "#fef2f2", border: "1px solid #fecaca", borderRadius: 4, padding: "1px 6px", display: "inline-block", marginBottom: 4 }}>Con diferencias</span>}
                      {p.total === 0 ? (
                        <div style={{ fontSize: 11, color: "#6b7280", fontStyle: "italic" }}>Sin subfamilias</div>
                      ) : (
                        <>
                          <div style={{ display: "flex", gap: 8, justifyContent: "center", flexWrap: "wrap" }}>
                            <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                              <div style={{ width: 8, height: 8, borderRadius: "50%", background: p.color }} />
                              <span style={{ fontSize: 11, color: "#374151" }}>{p.audited} audit.</span>
                            </div>
                            <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                              <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#e5e7eb", border: "1px solid #d1d5db" }} />
                              <span style={{ fontSize: 11, color: "#6b7280" }}>{p.pending} pend.</span>
                            </div>
                          </div>
                          <div style={{ marginTop: 5, fontSize: 10, color: "#6b7280" }}>{p.total} subfamilias</div>
                          <div style={{ marginTop: 3, fontSize: 11, fontWeight: 600, color: "#374151" }}>Valor: {fmtCLP(p.value)}</div>
                        </>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
    </div>
  );
}

// ─── Plants ───────────────────────────────────────────────────────────────────
function PlantsPage({ parts, plantSel, setPlantSel, sfSel, setSfSel, history, audits, handleSaveAudit, handleDeleteAudit, handleUpdateAuditDate, handleDeleteHistory, handleUpload, handleGlobalUpload, showToast, handleVerify, handlePhysQty, wide, mid, subfamilies, plantsMeta, users, setInv }) {
  const [editId, setEditId] = useState(null);
  const [search, setSearch] = useState("");
  const [tab, setTab] = useState("subfamilies");
  const [sfFilter, setSfFilter] = useState("all");
  const [globalUploadOpen, setGlobalUploadOpen] = useState(false);

  const plantData = useMemo(() => sortedPlantEntries(plantsMeta).filter(([, m]) => m.active).map(([code, meta]) => {
    const pp = parts.filter(p => p.plantCode === code);
    const sfs = subfamilies.filter(s => s.plantCode === code);
    return { code, ...meta, count: pp.length, verified: pp.filter(p => p.verified).length, value: pp.reduce((s, p) => s + partVal(p), 0), subfamilies: sfs.length };
  }), [parts, subfamilies, plantsMeta]);

  // Reset tab when plant changes
  useEffect(() => { setTab("subfamilies"); setSearch(""); setSfFilter("all"); setGlobalUploadOpen(false); }, [plantSel]);
  useEffect(() => { setSfFilter("all"); }, [audits]);

  if (sfSel) {
    return (
      <SubfamilyDashboard
        sfSel={sfSel} setSfSel={setSfSel} plantSel={plantSel} setPlantSel={setPlantSel}
        parts={parts} audits={audits} handleVerify={handleVerify} handlePhysQty={handlePhysQty}
        handleSaveAudit={handleSaveAudit} handleDeleteAudit={handleDeleteAudit}
        handleUpdateAuditDate={handleUpdateAuditDate}
        handleUpload={handleUpload} showToast={showToast}
        subfamilies={subfamilies} plantsMeta={plantsMeta} users={users}
        setInv={setInv}
        wide={wide}
      />
    );
  }

  if (plantSel) {
    const meta = plantsMeta[plantSel] || {};
    const sfs = subfamilies.filter(s => s.plantCode === plantSel);
    const plantParts = parts.filter(p => p.plantCode === plantSel);
    const plantHistory = history.filter(h => h.plantCode === plantSel);
    const plantVal = plantParts.reduce((s, p) => s + partVal(p), 0);
    const plantPct = plantParts.length ? Math.round((plantParts.filter(p => p.verified).length / plantParts.length) * 100) : 0;
    const plantAudits = audits.filter(a => a.plantCode === plantSel);

    // Subfamily-level audit metrics
    // Latest completed audit per subfamily
    const latestCompletedBySf = {};
    [...audits].sort((a, b) => new Date(b.date) - new Date(a.date)).forEach(a => {
      if (a.plantCode === plantSel && a.sfCode && a.status === "Completado" && !(a.sfCode in latestCompletedBySf)) {
        latestCompletedBySf[a.sfCode] = a;
      }
    });
    const sfVerified = sfs.filter(s => latestCompletedBySf[s.code] && latestCompletedBySf[s.code].diffItems === 0).length;
    const sfDiffs    = sfs.filter(s => latestCompletedBySf[s.code] && latestCompletedBySf[s.code].diffItems > 0).length;
    const sfPending  = sfs.length - sfVerified - sfDiffs;
    const sfPct      = sfs.length ? Math.round(((sfVerified + sfDiffs) / sfs.length) * 100) : 0;

    const filtered = sfs.filter(s => {
      const audit = latestCompletedBySf[s.code];
      const matchQ = !search || s.name.toLowerCase().includes(search.toLowerCase()) || s.code.toLowerCase().includes(search.toLowerCase());
      const matchF = sfFilter === "all"
        || (sfFilter === "verified" && audit && audit.diffItems === 0)
        || (sfFilter === "diffs"    && audit && audit.diffItems > 0)
        || (sfFilter === "pending"  && !audit);
      return matchQ && matchF;
    });

    const tabs = [
      { id: "subfamilies", label: "Subfamilias" },
      { id: "audits", label: `Auditorías (${plantAudits.length})` },
    ];

    return (
      <div>
        <Breadcrumb items={[{ label: "Plantas", onClick: () => setPlantSel(null) }, { label: meta.name || plantSel }]} />

        {/* Plant summary strip */}
        <div style={{ ...S.card, marginBottom: 16, borderLeft: `4px solid ${meta.color || "#2563eb"}` }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 8 }}>
            <div>
              <h1 style={{ fontSize: 18, fontWeight: 700, color: "#111827", margin: "0 0 2px" }}>{meta.name || plantSel}</h1>
              <div style={{ fontSize: 12, color: "#6b7280" }}>{sfs.length} subfamilias · {plantParts.length} repuestos</div>
            </div>
            <div style={{ textAlign: "right" }}>
              <div style={{ fontSize: 16, fontWeight: 700, color: "#111827" }}>{fmtCLP(plantVal)}</div>
              <div style={{ fontSize: 11, color: "#6b7280" }}>{sfPct}% subfamilias auditadas</div>
            </div>
          </div>
          <div style={{ background: "#f3f4f6", borderRadius: 4, height: 6, marginTop: 12 }}>
            <div style={{ width: `${sfPct}%`, height: "100%", background: meta.color || "#2563eb", borderRadius: 4 }} />
          </div>
        </div>

        {/* Tabs */}
        <div style={{ display: "flex", gap: 2, marginBottom: 16, borderBottom: "1px solid #e5e7eb" }}>
          {tabs.map(t => (
            <button key={t.id} onClick={() => setTab(t.id)} style={{ padding: "8px 14px", fontSize: 13, fontWeight: tab === t.id ? 600 : 400, color: tab === t.id ? "#2563eb" : "#6b7280", background: "none", border: "none", borderBottom: `2px solid ${tab === t.id ? "#2563eb" : "transparent"}`, cursor: "pointer", whiteSpace: "nowrap" }}>
              {t.label}
            </button>
          ))}
        </div>

        {/* Tab: Subfamilies (with live counters + verification entry) */}
        {tab === "subfamilies" && (
          <>
            {/* Sticky live counters */}
            <div style={{ position: "sticky", top: 0, zIndex: 10, background: "#fff", border: "1px solid #e5e7eb", borderRadius: 10, marginBottom: 12, padding: "10px 12px", boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}>
              <StatusCounters total={sfs.length} verified={sfVerified} diffs={sfDiffs} pending={sfPending} pct={sfPct} barColor={meta.color} activeFilter={sfFilter} onFilter={f => setSfFilter(f === sfFilter ? "all" : f)} />
            </div>

            <input placeholder="Buscar subfamilia…" value={search} onChange={e => setSearch(e.target.value)} style={{ ...S.input, marginBottom: 12 }} />

            {wide ? (
              <div style={{ ...S.card, padding: 0, overflow: "hidden" }}>
                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                  <thead><tr><th style={S.th}>Código</th><th style={S.th}>Subfamilia</th><th style={S.th}>Repuestos</th><th style={S.th}>Verificados</th><th style={S.th}>Diferencias</th><th style={S.th}>Valor</th><th style={S.th}></th></tr></thead>
                  <tbody>
                    {filtered.map(sf => {
                      const sp = parts.filter(p => p.subfamilyCode === sf.code);
                      const v = sp.filter(p => p.verified).length;
                      const d = sp.filter(p => p.physicalQty !== null && p.physicalQty !== p.systemQty).length;
                      const val = sp.reduce((s, p) => s + partVal(p), 0);
                      const pct = sp.length ? Math.round((v / sp.length) * 100) : 0;
                      return (
                        <tr key={sf.code} style={{ cursor: "pointer" }} onClick={() => setSfSel(sf.code)}>
                          <td style={S.td}><span style={{ fontFamily: "monospace", fontSize: 12 }}>{sf.code}</span></td>
                          <td style={S.td}><span style={{ fontWeight: 500 }}>{sf.name}</span></td>
                          <td style={S.td}>{sp.length}</td>
                          <td style={S.td}>
                            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                              <div style={{ width: 50, background: "#f3f4f6", borderRadius: 3, height: 5 }}><div style={{ width: `${pct}%`, height: "100%", background: pct === 100 ? "#16a34a" : "#2563eb", borderRadius: 3 }} /></div>
                              <span style={{ fontSize: 11, color: "#6b7280" }}>{v}/{sp.length}</span>
                            </div>
                          </td>
                          <td style={S.td}>{d > 0 ? <span style={{ color: "#b91c1c", fontWeight: 600 }}>{d}</span> : <span style={{ color: "#6b7280" }}>—</span>}</td>
                          <td style={S.td}><span style={{ fontWeight: 600 }}>{fmtCLP(val)}</span></td>
                          <td style={S.td}><Icon name="chevronRight" size={14} color="#9ca3af" /></td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {filtered.map(sf => {
                  const sp = parts.filter(p => p.subfamilyCode === sf.code);
                  const v = sp.filter(p => p.verified).length;
                  const d = sp.filter(p => p.physicalQty !== null && p.physicalQty !== p.systemQty).length;
                  const val = sp.reduce((s, p) => s + partVal(p), 0);
                  const pct = sp.length ? Math.round((v / sp.length) * 100) : 0;
                  return (
                    <button key={sf.code} onClick={() => setSfSel(sf.code)} style={{
                      ...S.card, cursor: "pointer", textAlign: "left", width: "100%",
                      background: d > 0 ? "#fff5f5" : pct === 100 ? "#f0fdf4" : "#fff",
                      border: `1.5px solid ${d > 0 ? "#f87171" : pct === 100 ? "#4ade80" : "#e5e7eb"}`,
                      borderLeft: `4px solid ${d > 0 ? "#dc2626" : pct === 100 ? "#16a34a" : "#e5e7eb"}`,
                    }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 6 }}>
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={{ fontSize: 11, color: "#6b7280", fontFamily: "monospace" }}>{sf.code}</div>
                          <div style={{ fontSize: 13, fontWeight: 500, color: "#111827", lineHeight: 1.4, marginTop: 2 }}>{sf.name}</div>
                        </div>
                        <span style={{ fontSize: 12, fontWeight: 700, color: d > 0 ? "#dc2626" : pct === 100 ? "#16a34a" : (meta.color || "#2563eb"), marginLeft: 8, flexShrink: 0 }}>{pct}%</span>
                      </div>
                      <div style={{ background: d > 0 ? "#fecaca" : pct === 100 ? "#bbf7d0" : "#f3f4f6", borderRadius: 4, height: 5, marginBottom: 8 }}>
                        <div style={{ width: `${pct}%`, height: "100%", background: d > 0 ? "#dc2626" : pct === 100 ? "#16a34a" : (meta.color || "#2563eb"), borderRadius: 4 }} />
                      </div>
                      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: "#6b7280" }}>
                        <div style={{ display: "flex", gap: 10 }}>
                          <span>{sp.length} ítems</span>
                          <span style={{ color: "#166534" }}>{v} ✓</span>
                          {d > 0 && <span style={{ color: "#b91c1c", fontWeight: 600 }}>{d} ≠</span>}
                          {sp.length - v - d > 0 && <span style={{ color: "#92400e" }}>{sp.length - v - d} pendiente{sp.length - v - d > 1 ? "s" : ""}</span>}
                        </div>
                        <span style={{ fontWeight: 500 }}>{fmtCLP(val)}</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            )}
          </>
        )}

        {/* Tab: Audits */}
        {tab === "audits" && (
          <PlantAuditPanel audits={plantAudits} wide={wide} plantColor={meta.color} onDelete={handleDeleteAudit} users={users} handleUpdateAuditDate={handleUpdateAuditDate} />
        )}
      </div>
    );
  }

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16, flexWrap: "wrap", gap: 10 }}>
        <div>
          <div style={{ fontWeight: 700, fontSize: 20, color: "#111827" }}>Plantas</div>
          <div style={{ fontSize: 12, color: "#6b7280", marginTop: 2 }}>Selecciona una planta para ver subfamilias y auditorías</div>
        </div>
        <button onClick={() => setGlobalUploadOpen(o => !o)} style={{ ...S.btn(), border: "1.5px solid #2563eb", color: "#2563eb", fontSize: 13, fontWeight: 600, gap: 6 }}>
          <Icon name="upload" size={14} color="#2563eb" /> Cargar archivo
        </button>
      </div>

      {globalUploadOpen && (
        <div style={{ marginBottom: 20 }}>
          <GlobalUploadPanel handleGlobalUpload={handleGlobalUpload} showToast={showToast} wide={wide} subfamilies={subfamilies} plantsMeta={plantsMeta} onClose={() => setGlobalUploadOpen(false)} />
        </div>
      )}
      <div style={{ display: "grid", gridTemplateColumns: wide ? "repeat(3, 1fr)" : mid ? "repeat(2, 1fr)" : "1fr", gap: 12 }}>
        {(() => {
          const latestCompletedBySf = {};
          [...audits].sort((a, b) => new Date(b.date) - new Date(a.date)).forEach(a => {
            if (a.sfCode && a.status === "Completado" && !(a.sfCode in latestCompletedBySf)) latestCompletedBySf[a.sfCode] = a;
          });
          return plantData.map(p => {
            const pct = p.count ? Math.round((p.verified / p.count) * 100) : 0;
            const plantH = history.filter(h => h.plantCode === p.code).length;
            const plantHasDiffs = subfamilies.some(s => s.plantCode === p.code && latestCompletedBySf[s.code] && latestCompletedBySf[s.code].diffItems > 0);
            return (
              <button key={p.code} onClick={() => setPlantSel(p.code)} style={{ ...S.card, cursor: "pointer", textAlign: "left", border: `1px solid ${p.color}30` }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
                  <div style={{ width: 36, height: 36, background: p.bg, border: `1px solid ${p.color}40`, borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700, color: p.color }}>{p.code}</div>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: 13, color: "#111827" }}>{p.name}</div>
                    <div style={{ fontSize: 11, color: "#6b7280" }}>{p.subfamilies} subfamilias · {p.count} repuestos</div>
                  </div>
                </div>
                <div style={{ fontSize: 13, fontWeight: 700, color: "#111827", marginBottom: 6 }}>{fmtCLP(p.value)}</div>
                <div style={{ background: "#f3f4f6", borderRadius: 4, height: 5, marginBottom: 6 }}><div style={{ width: `${pct}%`, height: "100%", background: p.color, borderRadius: 4 }} /></div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 11, color: "#6b7280" }}>
                  <span>{pct}% verificado</span>
                  <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
                    {plantHasDiffs && <span style={{ fontSize: 10, fontWeight: 600, color: "#b91c1c", background: "#fef2f2", border: "1px solid #fecaca", borderRadius: 4, padding: "1px 5px" }}>Con diferencias</span>}
                    {plantH > 0 && <span style={{ color: p.color, fontWeight: 500 }}>{plantH} carga{plantH > 1 ? "s" : ""}</span>}
                  </div>
                </div>
              </button>
            );
          });
        })()}
      </div>
    </div>
  );
}

// ─── Subfamily Dashboard ──────────────────────────────────────────────────────
function SubfamilyDashboard({ sfSel, setSfSel, plantSel, setPlantSel, parts, audits, handleVerify, handlePhysQty, handleSaveAudit, handleDeleteAudit, handleUpdateAuditDate, handleUpload, showToast, wide, subfamilies, plantsMeta, users, setInv }) {
  const [auditMode, setAuditMode] = useState(false);
  const [editingDraftId, setEditingDraftId] = useState(null); // id of draft being edited

  function enterDraftEdit(draft) {
    if (draft.status !== "Borrador") return;
    // Restore inv from draft snapshot so checkboxes reflect prior state
    setInv(prev => {
      const next = { ...prev };
      (draft.snapshot || []).forEach(p => {
        if (next[p.id]) next[p.id] = { ...next[p.id], verified: p.verified, physicalQty: p.physicalQty };
      });
      return next;
    });
    setEditingDraftId(draft.id);
    setAuditMode(true);
  }

  function enterFreshAudit() {
    setEditingDraftId(null);
    setAuditMode(true);
  }

  const [auditLeaveConfirm, setAuditLeaveConfirm] = useState(null);

  function exitAuditMode() {
    setAuditMode(false);
    setEditingDraftId(null);
  }

  function isAuditDirty() {
    return sfParts.some(p => p.verified || p.physicalQty !== null);
  }

  function guardedExitAudit(fn) {
    if (isAuditDirty()) { setAuditLeaveConfirm(() => fn); } else { fn(); }
  }

  const sfParts = parts.filter(p => p.subfamilyCode === sfSel);
  const sf = subfamilies.find(s => s.code === sfSel);
  const meta = plantsMeta[plantSel] || {};
  const sfAudits = audits.filter(a => a.sfCode === sfSel).sort((a, b) => new Date(b.date) - new Date(a.date));

  const sfVerified = sfParts.filter(p => p.verified).length;
  const sfDiffs = sfParts.filter(p => p.physicalQty !== null && p.physicalQty !== p.systemQty).length;
  const sfPending = sfParts.length - sfVerified;
  const sfVal = sfParts.reduce((s, p) => s + partVal(p), 0);
  const sfPct = sfParts.length ? Math.round((sfVerified / sfParts.length) * 100) : 0;
  const color = meta.color || "#2563eb";

  const sfPareto = useMemo(() => {
    if (!sfParts.length) return [];
    const sorted = [...sfParts].sort((a, b) => partVal(b) - partVal(a));
    let cum = 0;
    return sorted.map(p => { cum += partVal(p); return { ...p, val: partVal(p), cumPct: sfVal ? Math.round((cum / sfVal) * 100) : 0 }; });
  }, [sfParts, sfVal]);
  const maxPareto = sfPareto[0]?.val || 1;

  function onSaveAndReturn(plantCode, parts, user, date, sfCode, sfName, userId, status) {
    handleSaveAudit(plantCode, parts, user, date, sfCode, sfName, userId, status, editingDraftId);
    if (status === "Completado") exitAuditMode();
    else setEditingDraftId(null); // draft saved, clear edit context but stay in audit mode
  }

  // Audit mode
  if (auditMode) {
    const draftBeingEdited = editingDraftId ? audits.find(a => a.id === editingDraftId) : null;
    return (
      <div>
        {auditLeaveConfirm && <ConfirmDialog title="Cambios sin guardar" message="Tienes cambios sin guardar. Si sales, se perderán los datos. ¿Deseas salir?" confirmLabel="Salir sin guardar" cancelLabel="Cancelar" danger onConfirm={() => { setAuditLeaveConfirm(null); auditLeaveConfirm(); }} onCancel={() => setAuditLeaveConfirm(null)} />}
        <Breadcrumb items={[
          { label: "Plantas", onClick: () => guardedExitAudit(() => { exitAuditMode(); setSfSel(null); setPlantSel(null); }) },
          { label: meta.name || plantSel, onClick: () => guardedExitAudit(() => { exitAuditMode(); setSfSel(null); }) },
          { label: `${sfSel} - ${sf?.name || sfSel}`, onClick: () => guardedExitAudit(exitAuditMode) },
          { label: editingDraftId ? "Editar borrador" : "Auditoría" },
        ]} />
        <button onClick={() => guardedExitAudit(exitAuditMode)} style={{ display: "inline-flex", alignItems: "center", gap: 8, minHeight: 44, padding: "0 16px 0 10px", marginBottom: 14, background: "#f1f5f9", border: "1.5px solid #cbd5e1", borderRadius: 10, cursor: "pointer", fontSize: 14, fontWeight: 600, color: "#1e40af" }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg> Volver al dashboard
        </button>
        {sfParts.length === 0
          ? <EmptyState icon="package" title="Sin repuestos" sub="Sube un archivo en esta planta para agregar ítems." />
          : <PlantVerifyPanel
              key={editingDraftId || "new"}
              parts={sfParts} onVerify={handleVerify} onPhysQty={handlePhysQty}
              wide={wide} plantColor={color} plantCode={plantSel}
              sfCode={sfSel} sfName={sf?.name || sfSel}
              onSaveAudit={onSaveAndReturn} plantsMeta={plantsMeta} users={users}
              initialDraft={draftBeingEdited}
            />
        }
      </div>
    );
  }

  // Dashboard mode
  const kpiTiles = [
    { label: "Total repuestos", value: fmtN(sfParts.length),  color: "#374151", bg: "#f9fafb", border: "#e5e7eb" },
    { label: "Verificados",      value: fmtN(sfVerified),       color: "#166534", bg: "#f0fdf4", border: "#bbf7d0", sub: `${sfPct}%` },
    { label: "Diferencias",      value: fmtN(sfDiffs),          color: sfDiffs > 0 ? "#dc2626" : "#6b7280", bg: sfDiffs > 0 ? "#fef2f2" : "#f9fafb", border: sfDiffs > 0 ? "#fecaca" : "#e5e7eb" },
    { label: "Valor total",      value: fmtCLP(sfVal),          color, bg: "#f0f9ff", border: "#bae6fd" },
  ];

  return (
    <div>
      <Breadcrumb items={[
        { label: "Plantas", onClick: () => { setSfSel(null); setPlantSel(null); } },
        { label: meta.name || plantSel, onClick: () => setSfSel(null) },
        { label: `${sfSel} - ${sf?.name || sfSel}` },
      ]} />

      {/* Header */}
      <div style={{ ...S.card, marginBottom: 16, borderLeft: `4px solid ${color}` }}>
        <div style={{ display: "flex", flexDirection: wide ? "row" : "column", justifyContent: "space-between", alignItems: wide ? "flex-start" : "stretch", gap: 12 }}>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 11, color: "#6b7280", fontFamily: "monospace", marginBottom: 2 }}>{sfSel}</div>
            <h1 style={{ fontSize: 17, fontWeight: 700, color: "#111827", margin: "0 0 6px", lineHeight: 1.3 }}>{sf?.name || sfSel}</h1>
            <div style={{ background: "#f3f4f6", borderRadius: 4, height: 6, marginBottom: 6, maxWidth: 280 }}>
              <div style={{ width: `${sfPct}%`, height: "100%", background: sfPct === 100 ? "#16a34a" : color, borderRadius: 4, transition: "width 0.4s" }} />
            </div>
            <div style={{ fontSize: 12, color: "#6b7280" }}>{sfPct}% verificado</div>
          </div>
          <div style={{ display: "flex", gap: 8, flexShrink: 0, flexWrap: "wrap" }}>
            <button onClick={enterFreshAudit} style={{ ...S.btn("primary"), background: color, padding: wide ? "11px 20px" : "9px 16px", fontSize: wide ? 14 : 13, fontWeight: 700, borderRadius: 10, boxShadow: `0 4px 14px ${color}40`, gap: 8, width: wide ? "auto" : "100%", justifyContent: "center" }}>
              <Icon name="audit" size={16} color="#fff" /> Nueva auditoría
            </button>
          </div>
        </div>
      </div>

      {/* KPI grid */}
      <div style={{ display: "grid", gridTemplateColumns: wide ? "repeat(4, 1fr)" : "repeat(2, 1fr)", gap: 12, marginBottom: 20 }}>
        {kpiTiles.map(t => (
          <div key={t.label} style={{ background: t.bg, border: `1px solid ${t.border}`, borderRadius: 12, padding: "14px 16px" }}>
            <div style={{ fontSize: 12, color: "#374151", marginBottom: 4 }}>{t.label}</div>
            <div style={{ fontSize: 20, fontWeight: 700, color: t.color, lineHeight: 1.2 }}>{t.value}</div>
            {t.sub && <div style={{ fontSize: 12, color: t.color, marginTop: 4, opacity: 0.8 }}>{t.sub} completado</div>}
          </div>
        ))}
      </div>

      {sfDiffs > 0 && (
        <div style={{ background: "#fef2f2", border: "1px solid #fecaca", borderRadius: 10, padding: "10px 14px", marginBottom: 16, display: "flex", alignItems: "center", gap: 8 }}>
          <Icon name="alert" size={15} color="#dc2626" />
          <div style={{ fontSize: 13, color: "#b91c1c", fontWeight: 500 }}>{sfDiffs} repuesto{sfDiffs > 1 ? "s" : ""} con diferencias de cantidad</div>
          <button onClick={enterFreshAudit} style={{ ...S.btn("primary"), marginLeft: "auto", background: "#dc2626", fontSize: 12, padding: "5px 12px" }}>Revisar</button>
        </div>
      )}

      {/* ── Last Audit Summary ─────────────────────────────────────────── */}
      {(() => {
        const last = sfAudits[0];
        if (!last) return (
          <div style={{ ...S.card, marginBottom: 20, borderLeft: `4px solid #e5e7eb` }}>
            <div style={{ fontWeight: 600, fontSize: 13, color: "#374151", marginBottom: 4 }}>Última auditoría</div>
            <div style={{ fontSize: 12, color: "#6b7280" }}>Sin auditorías registradas para esta subfamilia.</div>
            <button onClick={enterFreshAudit} style={{ ...S.btn("primary"), background: color, marginTop: 12, fontSize: 12 }}>
              <Icon name="audit" size={13} color="#fff" /> Nueva auditoría
            </button>
          </div>
        );

        const compliancePct = last.totalItems ? Math.round((last.verifiedItems / last.totalItems) * 100) : 0;
        const criticalItems = last.snapshot.filter(p => p.diff !== null && p.diff < 0).length;
        const findingsItems = last.diffItems;
        const lastVariance = last.snapshot.reduce((s, p) => s + (p.diff && p.diff !== 0 ? p.diff * p.unitValue : 0), 0);

        // Compliance donut via conic-gradient
        const donutGrad = `conic-gradient(${compliancePct === 100 ? "#16a34a" : color} 0% ${compliancePct}%, #f3f4f6 ${compliancePct}% 100%)`;

        // Top 5 affected items (by absolute diff value)
        const topAffected = [...last.snapshot]
          .filter(p => p.diff !== null && p.diff !== 0)
          .sort((a, b) => Math.abs(b.diff) - Math.abs(a.diff))
          .slice(0, 5);

        // Findings by "category": shortage (diff < 0) vs surplus (diff > 0)
        const shortages = last.snapshot.filter(p => p.diff !== null && p.diff < 0).length;
        const surpluses = last.snapshot.filter(p => p.diff !== null && p.diff > 0).length;
        const maxBar = Math.max(shortages, surpluses, 1);

        return (
          <div style={{ ...S.card, marginBottom: 20, borderLeft: `4px solid ${color}` }}>
            {/* Header row */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 10, marginBottom: 16 }}>
              <div>
                <div style={{ fontWeight: 700, fontSize: 14, color: "#111827", marginBottom: 3 }}>Última auditoría</div>
                <div style={{ fontSize: 12, color: "#6b7280", display: "flex", gap: 12, flexWrap: "wrap" }}>
                  <span>📅 {new Date(last.date).toLocaleDateString("es-CL", { day: "2-digit", month: "short", year: "numeric" })}</span>
                  <span>👤 {resolveUser(last, users)}</span>
                  <span>🏭 {last.plantName || last.plantCode}</span>
                </div>
              </div>
              <div style={{ display: "flex", gap: 8, alignItems: "center", flexShrink: 0 }}>
                <span style={{ ...S.badge(last.status === "Completado" ? "#16a34a" : "#b45309", last.status === "Completado" ? "#f0fdf4" : "#fffbeb") }}>{last.status}</span>
                <button onClick={() => { const el = document.getElementById("sf-audit-history"); el?.scrollIntoView({ behavior: "smooth" }); }}
                  style={{ ...S.btn(), fontSize: 11, padding: "4px 10px", color: color, border: `1px solid ${color}` }}>
                  Ver historial
                </button>
              </div>
            </div>

            {/* KPI row */}
            <div style={{ display: "grid", gridTemplateColumns: wide ? "repeat(4, 1fr)" : "repeat(2, 1fr)", gap: 10, marginBottom: 16 }}>
              {[
                { label: "Ítems auditados", value: fmtN(last.totalItems), color: "#374151", bg: "#f9fafb", border: "#e5e7eb" },
                { label: "Cumplimiento", value: `${compliancePct}%`, color: compliancePct === 100 ? "#16a34a" : compliancePct >= 75 ? "#b45309" : "#dc2626", bg: compliancePct === 100 ? "#f0fdf4" : compliancePct >= 75 ? "#fffbeb" : "#fef2f2", border: compliancePct === 100 ? "#bbf7d0" : compliancePct >= 75 ? "#fde68a" : "#fecaca" },
                { label: "Hallazgos", value: fmtN(findingsItems), color: findingsItems > 0 ? "#b45309" : "#6b7280", bg: findingsItems > 0 ? "#fffbeb" : "#f9fafb", border: findingsItems > 0 ? "#fde68a" : "#e5e7eb" },
                { label: "Varianza ($)", value: fmtCLP(lastVariance), color: lastVariance < 0 ? "#dc2626" : lastVariance > 0 ? "#16a34a" : "#6b7280", bg: lastVariance < 0 ? "#fef2f2" : lastVariance > 0 ? "#f0fdf4" : "#f9fafb", border: lastVariance < 0 ? "#fecaca" : lastVariance > 0 ? "#bbf7d0" : "#e5e7eb" },
              ].map(t => (
                <div key={t.label} style={{ background: t.bg, border: `1px solid ${t.border}`, borderRadius: 10, padding: "11px 13px" }}>
                  <div style={{ fontSize: 11, color: "#6b7280", marginBottom: 4 }}>{t.label}</div>
                  <div style={{ fontSize: 19, fontWeight: 700, color: t.color }}>{t.value}</div>
                </div>
              ))}
            </div>

            {/* Charts row */}
            <div style={{ display: "grid", gridTemplateColumns: wide ? "1fr 1fr 1fr" : "1fr", gap: 14, marginBottom: last.snapshot.length ? 16 : 0 }}>

              {/* Compliance donut */}
              <div style={{ background: "#f9fafb", borderRadius: 10, padding: "14px", display: "flex", alignItems: "center", gap: 14 }}>
                <div style={{ position: "relative", flexShrink: 0 }}>
                  <div style={{ width: 72, height: 72, borderRadius: "50%", background: donutGrad, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <div style={{ width: 46, height: 46, borderRadius: "50%", background: "#f9fafb", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                      <div style={{ fontSize: 13, fontWeight: 800, color: compliancePct === 100 ? "#16a34a" : color, lineHeight: 1 }}>{compliancePct}%</div>
                    </div>
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: 12, fontWeight: 600, color: "#374151", marginBottom: 4 }}>Cumplimiento</div>
                  <div style={{ fontSize: 11, color: "#6b7280" }}>{last.verifiedItems} de {last.totalItems} ítems</div>
                  <div style={{ fontSize: 11, color: "#6b7280" }}>{last.totalItems - last.verifiedItems} pendientes</div>
                </div>
              </div>

              {/* Findings by type (shortage vs surplus) */}
              <div style={{ background: "#f9fafb", borderRadius: 10, padding: "14px" }}>
                <div style={{ fontSize: 12, fontWeight: 600, color: "#374151", marginBottom: 10 }}>Hallazgos por tipo</div>
                {[
                  { label: "Faltantes", count: shortages, color: "#b91c1c" },
                  { label: "Sobrantes", count: surpluses, color: "#92400e" },
                ].map(r => (
                  <div key={r.label} style={{ marginBottom: 8 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, marginBottom: 3 }}>
                      <span style={{ color: "#6b7280" }}>{r.label}</span>
                      <span style={{ fontWeight: 700, color: r.color }}>{fmtN(r.count)}</span>
                    </div>
                    <div style={{ background: "#e5e7eb", borderRadius: 3, height: 6 }}>
                      <div style={{ width: `${Math.round((r.count / maxBar) * 100)}%`, height: "100%", background: r.color, borderRadius: 3 }} />
                    </div>
                  </div>
                ))}
                {shortages === 0 && surpluses === 0 && <div style={{ fontSize: 11, color: "#6b7280" }}>Sin hallazgos registrados</div>}
              </div>

              {/* Monetary variance */}
              <div style={{ background: "#f9fafb", borderRadius: 10, padding: "14px" }}>
                <div style={{ fontSize: 12, fontWeight: 600, color: "#374151", marginBottom: 6 }}>Varianza monetaria</div>
                <div style={{ fontSize: 18, fontWeight: 700, color: lastVariance < 0 ? "#dc2626" : lastVariance > 0 ? "#16a34a" : "#6b7280", marginBottom: 4 }}>
                  {lastVariance > 0 ? "+" : ""}{fmtCLP(lastVariance)}
                </div>
                {findingsItems > 0 && (
                  <div style={{ fontSize: 11, color: "#6b7280" }}>
                    {findingsItems} ítem{findingsItems > 1 ? "s" : ""} · {fmtN(criticalItems)} faltante{criticalItems !== 1 ? "s" : ""}
                  </div>
                )}
                {findingsItems === 0 && <div style={{ fontSize: 11, color: "#166534" }}>✓ Sin diferencias de stock</div>}
              </div>
            </div>

            {/* Top affected items */}
            {topAffected.length > 0 && (
              <div>
                <div style={{ fontSize: 11, fontWeight: 600, color: "#6b7280", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 8 }}>Ítems más afectados</div>
                {topAffected.map((p, i) => (
                  <div key={p.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "6px 0", borderBottom: i < topAffected.length - 1 ? "1px solid #f3f4f6" : "none" }}>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: 12, fontWeight: 500, color: "#111827", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{p.code} - {p.name}</div>
                      <div style={{ fontSize: 11, color: "#6b7280" }}>Sist: {fmtN(p.systemQty)} → Fís: {p.physicalQty !== null ? fmtN(p.physicalQty) : "—"}</div>
                    </div>
                    <span style={{ ...S.badge(p.diff < 0 ? "#dc2626" : "#f59e0b", p.diff < 0 ? "#fef2f2" : "#fffbeb"), flexShrink: 0, marginLeft: 10 }}>
                      {p.diff > 0 ? "+" : ""}{fmtN(p.diff)}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      })()}

      {/* id anchor for "Ver historial" scroll */}
      <div id="sf-audit-history" />

      {/* Pareto */}
      {sfPareto.length > 0 && (() => {
        const chartData = sfPareto.slice(0, 15);
        const maxVal = chartData[0]?.val || 1;
        const paretoThreshIdx = chartData.findIndex(p => p.cumPct >= 80);
        const W = 480, H = 240, PT = 16, PB = 56, PL = 62, PR = 48;
        const chartW = W - PL - PR, chartH = H - PT - PB;
        const BAR_MIN_W = 52; // min px per bar for readable horizontal labels
        const svgW = Math.max(W, PL + PR + chartData.length * BAR_MIN_W);
        const chartWS = svgW - PL - PR;
        const barW = Math.floor(chartWS / chartData.length);
        const xTick = (i) => PL + i * barW + barW / 2;
        const yLine = (pct) => PT + chartH - Math.round((pct / 100) * chartH);
        const barColors = chartData.map((_, i) => i < 3 ? "#dc2626" : i < Math.max(1, paretoThreshIdx + 1) ? "#f59e0b" : "#93c5fd");

        return (
          <div style={{ ...S.card, marginBottom: 20 }}>
            <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 4, color: "#111827" }}>Pareto — repuestos por valor</div>
            <div style={{ fontSize: 11, color: "#6b7280", marginBottom: 16 }}>Barras por costo total · línea acumulada · umbral 80%</div>

            <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>

              {/* Histogram SVG — always on top, scrollable */}
              <div style={{ width: "100%", overflowX: "auto" }}>
                <div style={{ fontSize: 11, fontWeight: 600, color: "#6b7280", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 10 }}>Histograma</div>
                <svg viewBox={`0 0 ${svgW} ${H}`} width={svgW} height={H} style={{ display: "block", minWidth: svgW }}>
                  {[0, 25, 50, 75, 100].map(pct => {
                    const y = PT + chartH - Math.round((pct / 100) * chartH);
                    return (
                      <g key={pct}>
                        <line x1={PL} y1={y} x2={PL + chartWS} y2={y} stroke="#f3f4f6" strokeWidth="1" />
                        <text x={PL - 4} y={y + 4} textAnchor="end" fontSize="9" fill="#9ca3af">{fmtCLP(Math.round(maxVal * pct / 100))}</text>
                        <text x={PL + chartWS + 4} y={y + 4} textAnchor="start" fontSize="9" fill="#6b7280">{pct}%</text>
                      </g>
                    );
                  })}
                  {(() => {
                    const y80 = yLine(80);
                    return (
                      <g>
                        <line x1={PL} y1={y80} x2={PL + chartWS} y2={y80} stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="4 3" />
                        <text x={PL + chartWS - 2} y={y80 - 4} textAnchor="end" fontSize="9" fill="#b45309" fontWeight="600">80%</text>
                      </g>
                    );
                  })()}
                  {chartData.map((p, i) => {
                    const bh = Math.max(2, Math.round((p.val / maxVal) * chartH));
                    return (
                      <g key={p.id}>
                        <title>{fmtParetoCode(p.code)} — {p.name}: {fmtCLP(p.val)} ({p.cumPct}% acum.)</title>
                        <rect x={PL + i * barW + 2} y={PT + chartH - bh} width={Math.max(1, barW - 4)} height={bh}
                          fill={barColors[i]} rx="2" opacity="0.9" />
                      </g>
                    );
                  })}
                  {(() => {
                    const pts = chartData.map((p, i) => `${xTick(i)},${yLine(p.cumPct)}`).join(" ");
                    return (
                      <g>
                        <polyline points={pts} fill="none" stroke="#1d4ed8" strokeWidth="2" strokeLinejoin="round" />
                        {chartData.map((p, i) => (
                          <circle key={i} cx={xTick(i)} cy={yLine(p.cumPct)} r={i === paretoThreshIdx ? 5 : 3}
                            fill={i === paretoThreshIdx ? "#f59e0b" : "#1d4ed8"} stroke="#fff" strokeWidth="1.5" />
                        ))}
                      </g>
                    );
                  })()}
                  {chartData.map((p, i) => (
                    <g key={p.id}>
                      <title>{fmtParetoCode(p.code)} — {p.name}</title>
                      <text
                        x={xTick(i)} y={PT + H - PB + 14}
                        textAnchor="middle"
                        fontSize="9"
                        fill={i === paretoThreshIdx ? "#b45309" : "#6b7280"}
                        fontWeight={i === paretoThreshIdx ? "600" : "400"}
                      >
                        {fmtParetoCode(p.code)}
                      </text>
                    </g>
                  ))}
                  <line x1={PL} y1={PT} x2={PL} y2={PT + chartH} stroke="#d1d5db" strokeWidth="1" />
                  <line x1={PL} y1={PT + chartH} x2={PL + chartWS} y2={PT + chartH} stroke="#d1d5db" strokeWidth="1" />
                  <line x1={PL + chartWS} y1={PT} x2={PL + chartWS} y2={PT + chartH} stroke="#d1d5db" strokeWidth="1" />
                  <g transform={`translate(${PL}, ${H - 6})`}>
                    <rect x="0" y="-7" width="10" height="7" fill="#dc2626" rx="1" />
                    <text x="13" y="0" fontSize="8" fill="#6b7280">Top 3</text>
                    <rect x="42" y="-7" width="10" height="7" fill="#f59e0b" rx="1" />
                    <text x="55" y="0" fontSize="8" fill="#6b7280">Hasta 80%</text>
                    <rect x="102" y="-7" width="10" height="7" fill="#93c5fd" rx="1" />
                    <text x="115" y="0" fontSize="8" fill="#6b7280">Resto</text>
                    <line x1="148" y1="-4" x2="160" y2="-4" stroke="#1d4ed8" strokeWidth="2" />
                    <circle cx="154" cy="-4" r="2.5" fill="#1d4ed8" />
                    <text x="163" y="0" fontSize="8" fill="#6b7280">% Acum.</text>
                    <circle cx="210" cy="-4" r="3.5" fill="#f59e0b" stroke="#fff" strokeWidth="1" />
                    <text x="216" y="0" fontSize="8" fill="#b45309">Umbral 80%</text>
                  </g>
                </svg>
              </div>{/* end histogram */}

              {/* Ranked list — always below histogram */}
              <div style={{ width: "100%", minWidth: 0 }}>
                <div style={{ fontSize: 11, fontWeight: 600, color: "#6b7280", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 10 }}>Detalle por repuesto</div>
                {sfPareto.map((p, i) => (
                  <div key={p.id} style={{ marginBottom: 10 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, marginBottom: 3 }}>
                      <span style={{ color: "#374151", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", maxWidth: "55%", fontWeight: 500 }}>
                        {i + 1}. {p.code} - {p.name}
                      </span>
                      <div style={{ display: "flex", gap: 10, alignItems: "center", flexShrink: 0 }}>
                        <span style={{ color: p.cumPct <= 80 ? "#b45309" : "#6b7280", fontSize: 11, fontWeight: p.cumPct <= 80 ? 600 : 400 }}>{p.cumPct}% acum.</span>
                        <span style={{ fontWeight: 600, color: "#111827" }}>{fmtCLP(p.val)}</span>
                        {p.verified && <span style={{ color: "#166534", fontSize: 11 }}>✓</span>}
                        {p.physicalQty !== null && p.physicalQty !== p.systemQty && <span style={{ color: "#b91c1c", fontSize: 11, fontWeight: 700 }}>≠</span>}
                      </div>
                    </div>
                    <div style={{ background: "#f3f4f6", borderRadius: 3, height: 5 }}>
                      <div style={{ width: `${Math.round((p.val / maxPareto) * 100)}%`, height: "100%", background: i < 3 ? "#dc2626" : (paretoThreshIdx < 0 || i <= paretoThreshIdx) ? "#f59e0b" : color, borderRadius: 3 }} />
                    </div>
                  </div>
                ))}
              </div>{/* end ranked list */}

            </div>
          </div>
        );
      })()}

            {/* Audit history */}
      <SfAuditHistory audits={sfAudits} plantColor={color} wide={wide} onDelete={handleDeleteAudit} users={users} handleUpdateAuditDate={handleUpdateAuditDate} onEditDraft={enterDraftEdit} />
    </div>
  );
}
// ─── Subfamily Audit History ──────────────────────────────────────────────────
// ─── Audit Excel Export ───────────────────────────────────────────────────────
async function exportAuditXLSX(audit, users) {
  // Load SheetJS if not already present
  if (!window.XLSX) {
    await new Promise((res, rej) => {
      const s = document.createElement('script');
      s.src = 'https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js';
      s.onload = res; s.onerror = rej;
      document.head.appendChild(s);
    });
  }
  const XLSX = window.XLSX;

  const date = new Date(audit.date);
  const dateStr = date.toLocaleDateString('es-CL', { day: '2-digit', month: '2-digit', year: 'numeric' });
  const timeStr = date.toLocaleTimeString('es-CL', { hour: '2-digit', minute: '2-digit' });
  const pending = audit.totalItems - audit.verifiedItems;

  // Metadata rows
  const meta = [
    ['PF Stock — Reporte de Auditoría'],
    [],
    ['Fecha', dateStr],
    ['Hora', timeStr],
    ['Auditor', resolveUser(audit, users || []) || '—'],
    ['Estado', audit.status],
    ['Planta', audit.plantName || audit.plantCode || '—'],
    ['Subfamilia', audit.sfName || audit.sfCode || '—'],
    [],
    ['Total ítems', audit.totalItems],
    ['Verificados', audit.verifiedItems],
    ['Con diferencias', audit.diffItems],
    ['Pendientes', pending],
    ['Valor total inventario', audit.totalValue],
    [],
  ];

  // Item table header
  const header = ['Código', 'Nombre', 'Cant. sistema', 'Cant. física', 'Diferencia', 'Valor unit. (CLP)', 'Valor total (CLP)', 'Varianza (CLP)'];

  // Item rows from snapshot
  const items = (audit.snapshot || []).map(p => {
    const diff = p.diff !== undefined ? p.diff : (p.physicalQty !== null ? p.physicalQty - p.systemQty : null);
    const qty = p.physicalQty !== null ? p.physicalQty : p.systemQty;
    const total = qty * (p.unitValue || 0);
    const variance = diff !== null ? diff * (p.unitValue || 0) : null;
    return [
      p.code, p.name,
      p.systemQty, p.physicalQty !== null ? p.physicalQty : '',
      diff !== null ? diff : '',
      p.unitValue || 0, total,
      variance !== null ? variance : '',
    ];
  });

  const allRows = [...meta, header, ...items];

  const ws = XLSX.utils.aoa_to_sheet(allRows);
  const headerRowIdx = meta.length; // 0-based row index of header row

  // Column widths
  ws['!cols'] = [20, 36, 14, 14, 12, 18, 18, 16].map(w => ({ wch: w }));

  // Style helpers — SheetJS CE doesn't support cell styles natively; use cell format only
  // Apply number formats to value columns (E=4, F=5, G=6, H=7 in item rows)
  const itemStartRow = headerRowIdx + 1;
  (audit.snapshot || []).forEach((_, i) => {
    const r = itemStartRow + i;
    ['F', 'G', 'H'].forEach(col => {
      const ref = col + (r + 1);
      if (ws[ref] && typeof ws[ref].v === 'number') {
        ws[ref].z = '#,##0';
      }
    });
    // Numeric qty/diff cols
    ['D', 'E'].forEach(col => {
      const ref = col + (r + 1);
      if (ws[ref] && typeof ws[ref].v === 'number') ws[ref].z = '#,##0';
    });
  });

  // Format value summary cells
  ['B11', 'B12', 'B13', 'B14'].forEach(ref => {
    if (ws[ref] && typeof ws[ref].v === 'number') ws[ref].z = '#,##0';
  });

  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Auditoría');

  // Filename: audit_YYYY-MM-DD_auditor_plant-sf.xlsx
  const safeName = s => (s || '').replace(/[^a-zA-Z0-9À-ɏ]/g, '_').toLowerCase();
  const datePart = date.toISOString().slice(0, 10);
  const auditorPart = safeName(audit.user);
  const locationPart = safeName(audit.sfCode || audit.plantCode || '');
  const filename = `audit_${datePart}_${auditorPart}_${locationPart}.xlsx`;

  XLSX.writeFile(wb, filename);
}

function SfAuditHistory({ audits, plantColor, wide, onDelete, users, handleUpdateAuditDate, onEditDraft }) {
  const [openId, setOpenId] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  if (!audits.length) return (
    <div style={{ marginTop: 24 }}>
      <div style={{ fontSize: 13, fontWeight: 600, color: "#374151", marginBottom: 8 }}>Historial de auditorías</div>
      <div style={{ fontSize: 12, color: "#6b7280", padding: "12px 0" }}>Sin auditorías guardadas para esta subfamilia.</div>
    </div>
  );

  return (
    <div style={{ marginTop: 24 }}>
      {/* Delete confirm */}
      {deleteConfirm && <ConfirmDialog title="Eliminar auditoría" message="Esta acción no se puede deshacer." confirmLabel="Eliminar" danger onConfirm={() => { onDelete(deleteConfirm); setDeleteConfirm(null); if (openId === deleteConfirm) setOpenId(null); }} onCancel={() => setDeleteConfirm(null)} />}

      <div style={{ fontSize: 13, fontWeight: 600, color: "#374151", marginBottom: 10 }}>
        Historial de auditorías <span style={{ fontWeight: 400, color: "#6b7280" }}>({audits.length})</span>
      </div>

      {/* Audit list — detail expands inline inside each card */}
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {audits.map(a => {
          const isOpen = openId === a.id;
          return (
            <div key={a.id} style={{ ...S.card, padding: "10px 14px", border: `1px solid ${isOpen ? (plantColor || "#2563eb") + "50" : a.status === "Completado" ? "#bbf7d0" : "#fde68a"}` }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 13, fontWeight: 500, color: "#111827" }}>
                    {new Date(a.date).toLocaleDateString("es-CL", { day: "2-digit", month: "short", year: "numeric" })}
                    <span style={{ color: "#6b7280", marginLeft: 6, fontSize: 12 }}>{new Date(a.date).toLocaleTimeString("es-CL", { hour: "2-digit", minute: "2-digit" })}</span>
                  </div>
                  <div style={{ fontSize: 11, color: "#6b7280", marginTop: 1 }}>
                    {resolveUser(a, users)} · {a.verifiedItems}/{a.totalItems} verificados
                    {a.diffItems > 0 && <span style={{ color: "#b91c1c", fontWeight: 600, marginLeft: 6 }}>{a.diffItems} ≠</span>}
                  </div>
                </div>
                <div style={{ display: "flex", gap: 6, alignItems: "center", flexShrink: 0, marginLeft: 8, flexWrap: "wrap", justifyContent: "flex-end" }}>
                  {isOpen && handleUpdateAuditDate && a.status === "Borrador" && (
                    <input type="date" defaultValue={a.date.slice(0, 10)}
                      onChange={e => e.target.value && handleUpdateAuditDate(a.id, e.target.value)}
                      title="Editar fecha"
                      style={{ ...S.input, fontSize: 11, padding: "3px 6px", width: "auto", minWidth: 110 }} />
                  )}
                  <span style={{ ...S.badge(a.status === "Completado" ? "#16a34a" : a.status === "Borrador" ? "#6b7280" : "#b45309", a.status === "Completado" ? "#f0fdf4" : a.status === "Borrador" ? "#f3f4f6" : "#fffbeb") }}>{a.status}</span>
                  {a.status === "Borrador" && onEditDraft && (
                    <button onClick={() => onEditDraft(a)} style={{ ...S.btn(), padding: "4px 8px", fontSize: 11, color: "#2563eb", border: "1px solid #bfdbfe" }}>
                      <Icon name="edit" size={11} color="#2563eb" /> Editar
                    </button>
                  )}
                  {a.status === "Completado" && (
                    <button onClick={() => exportAuditXLSX(a, users)} style={{ ...S.btn(), padding: "4px 8px", fontSize: 11, color: "#166534", border: "1px solid #86efac" }} title="Exportar Excel">
                      <Icon name="upload" size={11} color="#166534" /> Excel
                    </button>
                  )}
                  <button onClick={() => setOpenId(cur => cur === a.id ? null : a.id)} style={{ ...S.btn(), padding: "4px 8px", fontSize: 12 }}>
                    {isOpen ? "▲" : "▼"}
                  </button>
                  <button onClick={() => setDeleteConfirm(a.id)} style={{ ...S.btn("danger"), padding: "4px 8px", fontSize: 12 }}>
                    <Icon name="trash" size={12} color="#dc2626" />
                  </button>
                </div>
              </div>

              {/* Inline expanded detail */}
              {isOpen && (() => {
                const totalVariance = a.snapshot.reduce((s, p) => s + (p.diff && p.diff !== 0 ? p.diff * p.unitValue : 0), 0);
                const sfTotal = a.snapshot.reduce((s, p) => s + (p.physicalQty !== null ? p.physicalQty : p.systemQty) * p.unitValue, 0);
                const enriched = [...a.snapshot]
                  .sort((x, y) => {
                    const tx = (x.physicalQty !== null ? x.physicalQty : x.systemQty) * x.unitValue;
                    const ty = (y.physicalQty !== null ? y.physicalQty : y.systemQty) * y.unitValue;
                    return ty - tx;
                  })
                  .reduce((acc, p) => {
                    const qty = p.physicalQty !== null ? p.physicalQty : p.systemQty;
                    const total = qty * p.unitValue;
                    const pctVal = sfTotal ? (total / sfTotal) * 100 : 0;
                    const cumPct = (acc.length ? acc[acc.length - 1].cumPct : 0) + pctVal;
                    const diffVal = (p.diff !== null && p.diff !== 0) ? p.diff * p.unitValue : null;
                    acc.push({ ...p, qty, total, pctVal, cumPct, diffVal });
                    return acc;
                  }, []);
                const paretoIdx = enriched.findIndex(p => p.cumPct >= 80);
                return (
                  <div style={{ marginTop: 12, borderTop: "1px solid #f3f4f6", paddingTop: 12 }}>
                    {/* KPI bar */}
                    <div style={{ display: "grid", gridTemplateColumns: wide ? "repeat(4, 1fr)" : "repeat(2, 1fr)", gap: 8, marginBottom: 12 }}>
                      {[["Total", fmtN(a.totalItems)], ["Verificados", fmtN(a.verifiedItems)], ["Diferencias", fmtN(a.diffItems)], ["Varianza", fmtCLP(totalVariance)]].map(([l, v]) => (
                        <div key={l} style={{ background: "#f9fafb", borderRadius: 6, padding: "6px 8px" }}>
                          <div style={{ fontSize: 10, color: "#374151" }}>{l}</div>
                          <div style={{ fontSize: 12, fontWeight: 700, color: l === "Diferencias" && a.diffItems > 0 ? "#dc2626" : l === "Varianza" && totalVariance < 0 ? "#dc2626" : l === "Varianza" && totalVariance > 0 ? "#16a34a" : "#111827" }}>{v}</div>
                        </div>
                      ))}
                    </div>
                    {/* Table */}
                    <div style={{ overflowX: "auto", margin: "0 -4px" }}>
                      <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 900, fontSize: 12 }}>
                        <thead>
                          <tr>
                            <th style={S.th}>Código</th>
                            <th style={S.th}>Descripción</th>
                            <th style={{ ...S.th, textAlign: "right" }}>Sistema</th>
                            <th style={{ ...S.th, textAlign: "right" }}>Físico</th>
                            <th style={{ ...S.th, textAlign: "right" }}>Dif.</th>
                            <th style={{ ...S.th, textAlign: "right" }}>Costo unit.</th>
                            <th style={{ ...S.th, textAlign: "right" }}>Costo total</th>
                            <th style={{ ...S.th, textAlign: "right", color: "#b91c1c" }}>Varianza ($)</th>
                            <th style={{ ...S.th, textAlign: "right" }}>% Valor</th>
                            <th style={{ ...S.th, textAlign: "right" }}>% Acum.</th>
                          </tr>
                        </thead>
                        <tbody>
                          {enriched.map((p, i) => {
                            const isPareto = i === paretoIdx;
                            const hasDiff = p.diff !== null && p.diff !== 0;
                            return (
                              <tr key={p.id} style={{ background: isPareto ? "#fffbeb" : hasDiff ? "#fef9f9" : p.verified ? "#f9fefb" : "transparent", borderLeft: `3px solid ${isPareto ? "#f59e0b" : "transparent"}` }}>
                                <td style={{ ...S.td, fontFamily: "monospace", fontSize: 11 }}>{p.code}</td>
                                <td style={{ ...S.td, maxWidth: 180, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{p.name}</td>
                                <td style={{ ...S.td, textAlign: "right" }}>{fmtN(p.systemQty)} {p.unit}</td>
                                <td style={{ ...S.td, textAlign: "right" }}>{p.physicalQty !== null ? `${fmtN(p.physicalQty)} ${p.unit}` : <span style={{ color: "#6b7280" }}>—</span>}</td>
                                <td style={{ ...S.td, textAlign: "right" }}>
                                  {hasDiff ? <span style={{ fontWeight: 700, color: p.diff < 0 ? "#dc2626" : "#16a34a" }}>{p.diff > 0 ? "+" : ""}{fmtN(p.diff)}</span> : <span style={{ color: "#6b7280" }}>—</span>}
                                </td>
                                <td style={{ ...S.td, textAlign: "right" }}>{fmtCLP(p.unitValue)}</td>
                                <td style={{ ...S.td, textAlign: "right", fontWeight: 600 }}>{fmtCLP(p.total)}</td>
                                <td style={{ ...S.td, textAlign: "right" }}>
                                  {p.diffVal !== null ? <span style={{ fontWeight: 700, color: p.diffVal < 0 ? "#dc2626" : "#16a34a" }}>{p.diffVal > 0 ? "+" : ""}{fmtCLP(p.diffVal)}</span> : <span style={{ color: "#6b7280" }}>—</span>}
                                </td>
                                <td style={{ ...S.td, textAlign: "right", color: "#6b7280" }}>{p.pctVal.toFixed(1)}%</td>
                                <td style={{ ...S.td, textAlign: "right", whiteSpace: "nowrap" }}>
                                  <span style={{ fontWeight: isPareto ? 700 : 400, color: isPareto ? "#b45309" : "#374151" }}>{p.cumPct.toFixed(1)}%</span>
                                  {isPareto && <span style={{ marginLeft: 5, fontSize: 10, color: "#92400e", fontWeight: 700 }}>◀80%</span>}
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                        {totalVariance !== 0 && (
                          <tfoot>
                            <tr style={{ background: "#f9fafb", borderTop: "2px solid #e5e7eb" }}>
                              <td colSpan={7} style={{ ...S.td, fontWeight: 700, color: "#374151" }}>Varianza total del inventario</td>
                              <td style={{ ...S.td, textAlign: "right", fontWeight: 800, color: totalVariance < 0 ? "#dc2626" : "#16a34a", fontSize: 13 }}>
                                {totalVariance > 0 ? "+" : ""}{fmtCLP(totalVariance)}
                              </td>
                              <td colSpan={2} style={S.td} />
                            </tr>
                          </tfoot>
                        )}
                      </table>
                    </div>
                  </div>
                );
              })()}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── Plant Upload Panel ───────────────────────────────────────────────────────
// ─── Global Upload Panel (main Plantas view, 6-column format) ─────────────────
function GlobalUploadPanel({ handleGlobalUpload, showToast, wide, subfamilies, plantsMeta, onClose }) {
  const [dragging, setDragging] = useState(false);
  const [pending, setPending] = useState(null);
  const [leaveConfirm, setLeaveConfirm] = useState(false);
  const [xlsxReady, setXlsxReady] = useState(!!window.XLSX);
  const fileRef = useRef();

  useEffect(() => {
    if (window.XLSX) { setXlsxReady(true); return; }
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js';
    script.onload = () => setXlsxReady(true);
    document.head.appendChild(script);
  }, []);

  function readFiles(files) {
    const arr = Array.from(files);
    let loaded = 0;
    const previews = [];

    const sfLookup = {};
    (subfamilies || []).forEach(s => { sfLookup[s.code.trim().toUpperCase()] = s; });

    arr.forEach(file => {
      const isExcel = /\.(xlsx|xls)$/i.test(file.name);
      const r = new FileReader();
      r.onerror = () => {
        previews.push({ name: file.name, rows: 0, errors: ['No se pudo leer el archivo'] });
        if (++loaded === arr.length) setPending({ files, previews });
      };
      r.onload = e => {
        try {
          let allRows;
          if (isExcel) {
            if (!window.XLSX) throw new Error('Librería Excel cargando…');
            const wb = window.XLSX.read(e.target.result, { type: 'array' });
            const ws = wb.Sheets[wb.SheetNames[0]];
            allRows = window.XLSX.utils.sheet_to_json(ws, { header: 1, defval: '' })
              .map(row => row.map(c => String(c ?? '').trim()));
          } else {
            allRows = e.target.result.split(/\r?\n/).filter(l => l.trim())
              .map(l => l.split(/[;,|\t]/).map(c => c.trim()));
          }

          const dataRows = allRows.slice(1).filter(r => r.length >= 1 && r[0]);
          const errors = [];

          if (dataRows.length === 0) {
            errors.push('Sin filas de datos');
          } else if (dataRows.every(r => r.length < 5)) {
            errors.push('Formato incorrecto: se requieren al menos 5 columnas (codigo;nombre;cantidad;valor;subfamilia)');
          } else {
            const unmatchedSfs = new Set();
            dataRows.forEach(cols => {
              if (cols.length < 5) return;
              const rawS = (cols[4] || '').trim().toUpperCase();
              if (!rawS || !sfLookup[rawS]) unmatchedSfs.add((cols[4] || '').trim() || '(vacío)');
            });
            if (unmatchedSfs.size) errors.push(`Subfamilias omitidas (${unmatchedSfs.size}): ${[...unmatchedSfs].slice(0, 5).join(', ')}${unmatchedSfs.size > 5 ? '\u2026' : ''} — esas filas se saltarán`);
          }

          const validRows = errors.length === 0 || errors.every(e => e.startsWith('Subfamilias omitidas'))
            ? dataRows.filter(r => r.length >= 5 && sfLookup[(r[4] || '').trim().toUpperCase()] && (parseFloat(r[2]) || 0) > 0).length
            : 0;
          const warnings = errors.filter(e => e.startsWith('Subfamilias omitidas'));
          const hardErrors = errors.filter(e => !e.startsWith('Subfamilias omitidas'));
          previews.push({ name: file.name, rows: validRows, errors: hardErrors, warnings });
        } catch (err) {
          previews.push({ name: file.name, rows: 0, errors: [err.message] });
        }
        if (++loaded === arr.length) setPending({ files, previews });
      };
      if (isExcel) r.readAsArrayBuffer(file);
      else r.readAsText(file);
    });
  }

  function drop(e) { e.preventDefault(); setDragging(false); readFiles(e.dataTransfer.files); }

  return (
    <div style={{ ...S.card, border: "1.5px solid #2563eb20" }}>
      {leaveConfirm && <ConfirmDialog title="Cambios sin guardar" message="Tienes cambios sin guardar. Si sales, se perderán los datos. ¿Deseas salir?" confirmLabel="Salir sin guardar" cancelLabel="Cancelar" danger onConfirm={() => { setLeaveConfirm(false); onClose(); }} onCancel={() => setLeaveConfirm(false)} />}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
        <div style={{ fontWeight: 600, fontSize: 14, color: "#111827" }}>Cargar archivo de inventario</div>
        <button onClick={() => { if (pending) { setLeaveConfirm(true); } else { onClose(); } }} style={{ ...S.btn(), padding: "4px 10px", fontSize: 12 }}>✕ Cerrar</button>
      </div>

      {pending && (() => {
        const hasErrors = pending.previews.some(p => p.errors && p.errors.length > 0);
        const hasWarnings = pending.previews.some(p => p.warnings && p.warnings.length > 0);
        const lines = pending.previews.map(p => {
          const errs = p.errors && p.errors.length ? "\u26a0 " + p.name + ":\n" + p.errors.map(e => "  \u2022 " + e).join('\n') : null;
          const warns = p.warnings && p.warnings.length ? p.warnings.map(w => "  \u26a0 " + w).join('\n') : null;
          const ok = "\u2713 " + p.name + " \u2014 " + p.rows + " \xedtems listos para importar";
          return errs || (warns ? ok + '\n' + warns : ok);
        });
        const msg = lines.join('\n\n');
        const fullMsg = hasErrors ? msg + "\n\nCorrige los errores y vuelve a cargar el archivo." : msg;
        return (
          <ConfirmDialog
            title={hasErrors ? "Errores en el archivo" : "Confirmar importación"}
            message={fullMsg}
            confirmLabel={hasErrors ? undefined : "Importar"}
            cancelLabel={hasErrors ? "Cerrar" : "Cancelar"}
            accentColor="#2563eb"
            onConfirm={hasErrors ? null : () => { handleGlobalUpload(pending.files); setPending(null); onClose(); }}
            onCancel={() => setPending(null)}
          />
        );
      })()}

      <div
        onDragOver={e => { e.preventDefault(); setDragging(true); }}
        onDragLeave={() => setDragging(false)}
        onDrop={drop}
        style={{ border: `2px dashed ${dragging ? "#2563eb" : "#d1d5db"}`, background: dragging ? "#eff6ff" : "#fafafa", borderRadius: 12, padding: "28px 24px", textAlign: "center", cursor: "pointer", marginBottom: 16, transition: "all 0.2s", position: "relative", overflow: "hidden" }}
      >
        <Icon name="upload" size={26} color={dragging ? "#2563eb" : "#9ca3af"} />
        <div style={{ fontWeight: 600, fontSize: 14, marginTop: 8, color: "#374151" }}>Arrastra archivos aquí</div>
        <div style={{ fontSize: 13, color: "#6b7280", marginTop: 3 }}>O haz clic para seleccionar</div>
        <div style={{ fontSize: 12, color: "#6b7280", marginTop: 6 }}>
          CSV, TSV, Excel (.xlsx, .xls) — múltiples archivos permitidos
          {!xlsxReady && <span style={{ color: "#92400e" }}> · Cargando soporte Excel…</span>}
        </div>
        <input ref={fileRef} type="file" accept=".csv,.tsv,.txt,.xlsx,.xls" multiple
          onChange={e => readFiles(e.target.files)}
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0, cursor: "pointer" }} />
      </div>

      <div style={{ background: "#f9fafb", borderRadius: 8, padding: "12px 14px" }}>
        <div style={{ fontWeight: 600, fontSize: 12, marginBottom: 6, color: "#374151" }}>Formato esperado (6 columnas)</div>
        <div style={{ background: "#111827", borderRadius: 6, padding: "10px 12px", fontFamily: "monospace", fontSize: 11, color: "#d1d5db", lineHeight: 1.8, overflowX: "auto" }}>
          <div style={{ color: "#6b7280" }}># codigo;nombre;cantidad;valor;subfamilia;bodega</div>
          <div>L-001;Rodamiento SKF 6205;5;45000;R668;302</div>
          <div>F-002;Correa dentada XL;3;28000;R668;330</div>
          <div>REP-003;Sello mecánico;10;15500;R017;300</div>
        </div>
        <div style={{ fontSize: 11, color: "#6b7280", marginTop: 8 }}>
          <strong>subfamilia</strong>: código del sistema. Planta asignada automáticamente. R-999: bodega 302→Lubricantes, 330→Fungibles. Otros LU/FU: codigo L→Lubricantes, F→Fungibles. Filas con cantidad=0 se omiten.
        </div>
      </div>
    </div>
  );
}

// ─── Plant Upload Panel (per-plant upload) ────────────────────────────────────
function PlantUploadPanel({ plantCode, plantName, plantColor, handleUpload, showToast, wide, subfamilies }) {
  const [dragging, setDragging] = useState(false);
  const [pending, setPending] = useState(null);
  const [xlsxReady, setXlsxReady] = useState(!!window.XLSX);
  const fileRef = useRef();

  // Load SheetJS once if not already present
  useEffect(() => {
    if (window.XLSX) { setXlsxReady(true); return; }
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js';
    script.onload = () => setXlsxReady(true);
    document.head.appendChild(script);
  }, []);

  function readFiles(files) {
    const arr = Array.from(files);
    let loaded = 0;
    const previews = [];
    const sfLookup = {};
    (subfamilies || []).forEach(s => { sfLookup[s.code.trim().toUpperCase()] = s.code; });

    arr.forEach(file => {
      const isExcel = /\.(xlsx|xls)$/i.test(file.name);
      const r = new FileReader();
      r.onerror = () => {
        previews.push({ name: file.name, rows: 0, errors: ['No se pudo leer el archivo'] });
        if (++loaded === arr.length) setPending({ files, previews });
      };
      r.onload = e => {
        try {
          let allRows;
          if (isExcel) {
            if (!window.XLSX) throw new Error('Librería Excel cargando…');
            const wb = window.XLSX.read(e.target.result, { type: 'array' });
            const ws = wb.Sheets[wb.SheetNames[0]];
            allRows = window.XLSX.utils.sheet_to_json(ws, { header: 1, defval: '' })
              .map(row => row.map(c => String(c ?? '').trim()));
          } else {
            allRows = e.target.result.split(/\r?\n/).filter(l => l.trim())
              .map(l => l.split(/[;,|\t]/).map(c => c.trim()));
          }

          const dataRows = allRows.slice(1).filter(r => r.length >= 1 && r[0]);
          const errors = [];

          if (dataRows.length === 0) {
            errors.push('Sin filas de datos');
          } else if (dataRows.every(r => r.length < 5)) {
            errors.push('Formato incorrecto: se requieren al menos 5 columnas (codigo;nombre;cantidad;valor;subfamilia)');
          } else {
            const unmatched = new Set();
            dataRows.forEach((cols) => {
              if (cols.length < 5) return;
              const raw = (cols[4] || '').trim().toUpperCase();
              if (!raw) return;
              if (!sfLookup[raw]) unmatched.add((cols[4] || '').trim());
            });
            if (unmatched.size) errors.push(`Subfamilias omitidas (${unmatched.size}): ${[...unmatched].slice(0, 5).join(', ')}${unmatched.size > 5 ? '…' : ''} — esas filas se saltarán`);
          }

          const validRows = errors.length === 0 || errors.every(e => e.startsWith('Subfamilias omitidas'))
            ? dataRows.filter(r => r.length >= 5 && sfLookup[(r[4] || '').trim().toUpperCase()] && (parseFloat(r[2]) || 0) > 0).length
            : 0;
          const warnings = errors.filter(e => e.startsWith('Subfamilias omitidas'));
          const hardErrors = errors.filter(e => !e.startsWith('Subfamilias omitidas'));
          previews.push({ name: file.name, rows: validRows, errors: hardErrors, warnings });
        } catch (err) {
          previews.push({ name: file.name, rows: 0, errors: [err.message] });
        }
        if (++loaded === arr.length) setPending({ files, previews });
      };
      if (isExcel) r.readAsArrayBuffer(file);
      else r.readAsText(file);
    });
  }
  function drop(e) { e.preventDefault(); setDragging(false); readFiles(e.dataTransfer.files); }

  return (
    <div style={{ maxWidth: wide ? 580 : "100%" }}>
      {pending && (() => {
        const hasErrors = pending.previews.some(p => p.errors && p.errors.length > 0);
        const lines = pending.previews.map(p => {
          const errs = p.errors && p.errors.length ? "\u26a0 " + p.name + ":\n" + p.errors.map(e => "  \u2022 " + e).join('\n') : null;
          const warns = p.warnings && p.warnings.length ? p.warnings.map(w => "  \u26a0 " + w).join('\n') : null;
          const ok = "\u2713 " + p.name + " \u2014 " + p.rows + " \xedtems listos para importar";
          return errs || (warns ? ok + '\n' + warns : ok);
        });
        const msg = lines.join('\n\n');
        const fullMsg = hasErrors ? msg + "\n\nCorrige los errores y vuelve a cargar el archivo." : msg + "\n\nSe importarán a " + (plantName || plantCode) + ".";
        return (
          <ConfirmDialog
            title={hasErrors ? "Errores en el archivo" : "Confirmar importación"}
            message={fullMsg}
            confirmLabel={hasErrors ? undefined : "Importar"}
            cancelLabel={hasErrors ? "Cerrar" : "Cancelar"}
            accentColor={plantColor}
            onConfirm={hasErrors ? null : () => { handleUpload(pending.files, plantCode); setPending(null); }}
            onCancel={() => setPending(null)}
          />
        );
      })()}
      <div style={{ background: "#f8fafc", border: "1px solid #e5e7eb", borderRadius: 10, padding: "12px 14px", marginBottom: 16, display: "flex", alignItems: "center", gap: 8 }}>
        <Icon name="upload" size={14} color={plantColor || "#2563eb"} />
        <span style={{ fontSize: 13, color: "#374151" }}>Los archivos cargados aquí se asignarán a <strong>{plantName || plantCode}</strong>.</span>
      </div>

      <div
        onDragOver={e => { e.preventDefault(); setDragging(true); }}
        onDragLeave={() => setDragging(false)}
        onDrop={drop}
        style={{ border: `2px dashed ${dragging ? (plantColor || "#2563eb") : "#d1d5db"}`, background: dragging ? "#eff6ff" : "#fafafa", borderRadius: 12, padding: "36px 24px", textAlign: "center", cursor: "pointer", marginBottom: 16, transition: "all 0.2s", position: "relative", overflow: "hidden" }}
      >
        <Icon name="upload" size={28} color={dragging ? (plantColor || "#2563eb") : "#9ca3af"} />
        <div style={{ fontWeight: 600, fontSize: 14, marginTop: 10, color: "#374151" }}>Arrastra archivos aquí</div>
        <div style={{ fontSize: 13, color: "#6b7280", marginTop: 4 }}>O haz clic para seleccionar</div>
        <div style={{ fontSize: 12, color: "#6b7280", marginTop: 8 }}>
          CSV, TSV, Excel (.xlsx, .xls) — múltiples archivos permitidos
          {!xlsxReady && <span style={{ color: "#92400e" }}> · Cargando soporte Excel…</span>}
        </div>
        <input ref={fileRef} type="file" accept=".csv,.tsv,.txt,.xlsx,.xls" multiple
          onChange={e => readFiles(e.target.files)}
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0, cursor: "pointer" }} />
      </div>

      <div style={S.card}>
        <div style={{ fontWeight: 600, fontSize: 13, marginBottom: 8 }}>Formato esperado</div>
        <div style={{ background: "#111827", borderRadius: 8, padding: "12px 14px", fontFamily: "monospace", fontSize: 12, color: "#d1d5db", lineHeight: 1.8 }}>
          <div style={{ color: "#6b7280", marginBottom: 4 }}># codigo;nombre;cantidad;valor;subfamilia;bodega</div>
          <div>REP-001;Rodamiento SKF 6205;5;45000;R017;300</div>
          <div>L-002;Aceite hidráulico;3;28000;R999;302</div>
          <div>F-003;Guante nitrilo;10;1500;R999FU;330</div>
        </div>
        <div style={{ fontSize: 12, color: "#6b7280", marginTop: 10 }}>
          <strong>subfamilia</strong>: código del sistema (ej: R017). Planta asignada automáticamente. R-999: bodega 302→Lubricantes, 330→Fungibles. Otros LU/FU: codigo L→Lubricantes, F→Fungibles. Columnas A–F.
        </div>
      </div>
    </div>
  );
}

// ─── Plant History Panel ──────────────────────────────────────────────────────
function PlantHistoryPanel({ plantHistory, wide }) {
  if (!plantHistory.length) return (
    <EmptyState icon="history" title="Sin cargas para esta planta" sub="Usa la pestaña 'Cargar archivo' para importar repuestos." />
  );

  const totalItems = plantHistory.reduce((s, h) => s + h.items, 0);
  const totalValue = plantHistory.reduce((s, h) => s + h.value, 0);

  return (
    <div>
      {/* Summary */}
      <div style={{ display: "grid", gridTemplateColumns: wide ? "repeat(3, 1fr)" : mid ? "repeat(2, 1fr)" : "1fr", gap: 10, marginBottom: 16 }}>
        {[["Cargas", plantHistory.length], ["Ítems importados", fmtN(totalItems)], ["Valor importado", fmtCLP(totalValue)]].map(([l, v]) => (
          <div key={l} style={{ background: "#f9fafb", border: "1px solid #e5e7eb", borderRadius: 8, padding: "10px 12px" }}>
            <div style={{ fontSize: 11, color: "#6b7280", marginBottom: 3 }}>{l}</div>
            <div style={{ fontSize: 14, fontWeight: 700, color: "#111827" }}>{v}</div>
          </div>
        ))}
      </div>

      {wide ? (
        <div style={{ ...S.card, padding: 0, overflow: "hidden" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr>
                <th style={S.th}>Archivo</th>
                <th style={S.th}>Fecha</th>
                <th style={S.th}>Ítems</th>
                <th style={S.th}>Valor total</th>
                <th style={S.th}>Estado</th>
              </tr>
            </thead>
            <tbody>
              {plantHistory.map(h => (
                <tr key={h.id}>
                  <td style={S.td}><div style={{ display: "flex", alignItems: "center", gap: 6 }}><Icon name="file" size={14} color="#9ca3af" />{h.fileName}</div></td>
                  <td style={S.td}>{new Date(h.date).toLocaleDateString("es-CL")} {new Date(h.date).toLocaleTimeString("es-CL", { hour: "2-digit", minute: "2-digit" })}</td>
                  <td style={S.td}>{fmtN(h.items)}</td>
                  <td style={S.td}><span style={{ fontWeight: 600 }}>{fmtCLP(h.value)}</span></td>
                  <td style={S.td}><span style={{ ...S.badge("#16a34a", "#f0fdf4") }}>Importado</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {plantHistory.map(h => (
            <div key={h.id} style={S.card}>
              <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 5 }}>
                <Icon name="file" size={13} color="#9ca3af" />
                <span style={{ fontSize: 13, fontWeight: 500, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", flex: 1 }}>{h.fileName}</span>
                <span style={{ ...S.badge("#16a34a", "#f0fdf4"), flexShrink: 0 }}>Importado</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: "#6b7280" }}>
                <span>{new Date(h.date).toLocaleDateString("es-CL")} {new Date(h.date).toLocaleTimeString("es-CL", { hour: "2-digit", minute: "2-digit" })}</span>
                <span>{fmtN(h.items)} ítems · <strong style={{ color: "#111827" }}>{fmtCLP(h.value)}</strong></span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Status Counters ──────────────────────────────────────────────────────────
function StatusCounters({ total, verified, diffs, pending, pct, barColor, activeFilter, onFilter, labels }) {
  const L = labels || { all: "Subfamilias", verified: "Auditadas", diffs: "Con dif.", pending: "Pendientes" };
  const tiles = [
    { id: "all",      label: L.all,      count: total,    color: "#374151", bg: "#f9fafb", border: "#e5e7eb" },
    { id: "verified", label: L.verified, count: verified, color: "#166534", bg: "#f0fdf4", border: "#bbf7d0" },
    { id: "diffs",    label: L.diffs,    count: diffs,    color: diffs > 0 ? "#dc2626" : "#6b7280", bg: diffs > 0 ? "#fef2f2" : "#f9fafb", border: diffs > 0 ? "#fecaca" : "#e5e7eb" },
    { id: "pending",  label: L.pending,  count: pending,  color: pending > 0 ? "#b45309" : "#6b7280", bg: pending > 0 ? "#fffbeb" : "#f9fafb", border: pending > 0 ? "#fde68a" : "#e5e7eb" },
  ];
  return (
    <div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 6, marginBottom: 8 }}>
        {tiles.map(t => {
          const isActive = onFilter && activeFilter === t.id;
          return (
            <div key={t.id}
              onClick={() => onFilter?.(t.id)}
              style={{
                background: t.bg, border: `${isActive ? 2 : 1}px solid ${isActive ? t.color : t.border}`,
                borderRadius: 8, padding: "7px 8px", textAlign: "center",
                cursor: onFilter ? "pointer" : "default",
                boxShadow: isActive ? `0 0 0 2px ${t.color}30` : "none",
                transition: "box-shadow 0.15s, border 0.15s",
              }}
            >
              <div style={{ fontSize: 18, fontWeight: 700, color: t.color, lineHeight: 1.1 }}>{fmtN(t.count)}</div>
              <div style={{ fontSize: 10, color: t.color, opacity: 0.75, marginTop: 2, fontWeight: 500 }}>{t.label}</div>
            </div>
          );
        })}
      </div>
      <div style={{ background: "#f3f4f6", borderRadius: 3, height: 4, overflow: "hidden" }}>
        <div style={{ width: `${pct}%`, height: "100%", background: pct === 100 ? "#16a34a" : (barColor || "#2563eb"), borderRadius: 3, transition: "width 0.25s" }} />
      </div>
    </div>
  );
}

// ─── Plant Verify Panel ───────────────────────────────────────────────────────
function PlantVerifyPanel({ parts, onVerify, onPhysQty, wide, plantColor, plantCode, sfCode, sfName, onSaveAudit, plantsMeta, users, initialDraft }) {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [showAuditDialog, setShowAuditDialog] = useState(false);

  const todayISO = new Date().toISOString().slice(0, 10);
  const [auditDate, setAuditDate] = useState(initialDraft ? initialDraft.date.slice(0, 10) : todayISO);
  const [auditUser, setAuditUser] = useState(initialDraft ? (initialDraft.user || "") : "");
  const [auditUserId, setAuditUserId] = useState(initialDraft ? (initialDraft.userId || null) : null);

  const verified = parts.filter(p => p.verified).length;
  const diffs = parts.filter(p => p.physicalQty !== null && p.physicalQty !== p.systemQty).length;
  const pending = parts.length - verified;
  const pct = parts.length ? Math.round((verified / parts.length) * 100) : 0;

  // On fresh audit (no draft), reset all parts to unverified
  useEffect(() => {
    if (!initialDraft) {
      parts.forEach(p => {
        onVerify(p.id, false);
        onPhysQty(p.id, "");
      });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // run once on mount only

  const filtered = useMemo(() => parts.filter(p => {
    const q = search.toLowerCase();
    const mQ = !q || p.code.toLowerCase().includes(q) || p.name.toLowerCase().includes(q) || p.subfamilyCode.toLowerCase().includes(q);
    const mF = filter === "all" || (filter === "verified" && p.verified) || (filter === "pending" && !p.verified) || (filter === "diff" && p.physicalQty !== null && p.physicalQty !== p.systemQty);
    return mQ && mF;
  }), [parts, search, filter]);

  const [isSaving, setIsSaving] = useState(false);
  const savingRef = useRef(false);

  function doSave(status) {
    if (!auditUser.trim() || savingRef.current) return;
    savingRef.current = true;
    setIsSaving(true);
    onSaveAudit(plantCode, parts, auditUser.trim(), auditDate, sfCode, sfName, auditUserId, status);
    setShowAuditDialog(false);
    setAuditUser("");
    setAuditUserId(null);
    setAuditDate(todayISO);
    setTimeout(() => { savingRef.current = false; setIsSaving(false); }, 500);
  }

  return (
    <div>
      {/* Audit dialog */}
      {showAuditDialog && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.45)", zIndex: 100, display: "flex", alignItems: "center", justifyContent: "center", padding: 16 }}>
          <div style={{ background: "#fff", borderRadius: 14, padding: "24px 20px", width: "100%", maxWidth: 380, boxShadow: "0 8px 32px rgba(0,0,0,0.18)", overflowY: "auto", maxHeight: "90vh" }}>
            <div style={{ fontWeight: 700, fontSize: 16, color: "#111827", marginBottom: 4 }}>Finalizar auditoría</div>
            <div style={{ fontSize: 13, color: "#6b7280", marginBottom: 20 }}>
              {verified}/{parts.length} ítems verificados · {diffs} diferencias
            </div>
            <div style={{ marginBottom: 14 }}>
              <label style={{ fontSize: 12, fontWeight: 600, color: "#374151", display: "block", marginBottom: 5 }}>Fecha de auditoría</label>
              <input type="date" value={auditDate} onChange={e => setAuditDate(e.target.value)} style={{ ...S.input, background: "#fff", color: "#111827", WebkitAppearance: "none", appearance: "none", minWidth: 0 }} />
            </div>
            <div style={{ marginBottom: 20 }}>
              <label style={{ fontSize: 12, fontWeight: 600, color: "#374151", display: "block", marginBottom: 5 }}>Auditor <span style={{ color: "#b91c1c" }}>*</span></label>
              {users && users.length > 0 ? (
                <select value={auditUser} onChange={e => {
                    const sel = users.find(u => `${u.nombre} ${u.apellido}` === e.target.value);
                    setAuditUser(e.target.value);
                    setAuditUserId(sel ? sel.id : null);
                  }}
                  style={{ ...S.input, background: "#fff", borderColor: !auditUser.trim() ? "#fca5a5" : "#d1d5db" }}>
                  <option value="">Seleccionar auditor…</option>
                  {users.map(u => {
                    const display = `${u.nombre} ${u.apellido}`;
                    return <option key={u.id} value={display}>{display}</option>;
                  })}
                </select>
              ) : (
                <input value={auditUser} onChange={e => setAuditUser(e.target.value)} placeholder="Ingresa tu nombre…"
                  style={{ ...S.input, borderColor: !auditUser.trim() ? "#fca5a5" : "#d1d5db" }}
                  onKeyDown={e => e.key === "Enter" && doSave("Completado")} autoFocus />
              )}
              {!auditUser.trim() && <div style={{ fontSize: 11, color: "#b91c1c", marginTop: 4 }}>Requerido</div>}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <button onClick={() => doSave("Completado")} disabled={!auditUser.trim() || isSaving}
                style={{ ...S.btn("primary"), justifyContent: "center", background: auditUser.trim() ? (plantColor || "#2563eb") : "#93c5fd", cursor: auditUser.trim() ? "pointer" : "not-allowed", padding: "11px 16px", fontSize: 14, fontWeight: 700, borderRadius: 10 }}>
                <Icon name="audit" size={14} color="#fff" /> {isSaving ? "Guardando…" : "Confirmar"}
              </button>
              <div style={{ display: "flex", gap: 8 }}>
                <button onClick={() => doSave("Borrador")} disabled={!auditUser.trim() || isSaving}
                  style={{ ...S.btn(), flex: 1, justifyContent: "center", color: "#6b7280", fontSize: 12 }}>
                  <Icon name="save" size={13} color="#6b7280" /> Guardar borrador
                </button>
                <button onClick={() => setShowAuditDialog(false)} style={{ ...S.btn(), flex: 1, justifyContent: "center", fontSize: 12 }}>Cancelar</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Sticky summary counters */}
      <div style={{
        position: "sticky", top: 0, zIndex: 10,
        background: "#fff", border: "1px solid #e5e7eb", borderRadius: 10,
        marginBottom: 14, padding: "10px 14px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
      }}>
        <StatusCounters total={parts.length} verified={verified} diffs={diffs} pending={pending} pct={pct} barColor={plantColor}
          activeFilter={filter === "diff" ? "diffs" : filter}
          onFilter={f => { const mapped = f === "diffs" ? "diff" : f; setFilter(v => v === mapped ? "all" : mapped); }}
          labels={{ all: "Repuestos", verified: "Auditados", diffs: "Con dif.", pending: "Pendientes" }}
        />
        <div style={{ background: "#f3f4f6", borderRadius: 4, height: 5, overflow: "hidden", marginBottom: 10 }}>
          <div style={{ width: `${pct}%`, height: "100%", background: pct === 100 ? "#16a34a" : (plantColor || "#2563eb"), borderRadius: 4, transition: "width 0.25s" }} />
        </div>
      </div>

      {diffs > 0 && (
        <div style={{ background: "#fef2f2", border: "1px solid #fecaca", borderRadius: 8, padding: "8px 12px", marginBottom: 12, fontSize: 12, color: "#b91c1c", display: "flex", alignItems: "center", gap: 6 }}>
          <Icon name="alert" size={13} color="#dc2626" />
          {diffs} repuesto{diffs > 1 ? "s" : ""} con cantidad física diferente al sistema.
        </div>
      )}

      {/* Filters */}
      <div style={{ display: "flex", gap: 8, marginBottom: 14, flexWrap: "wrap" }}>
        <input placeholder="Buscar código o nombre…" value={search} onChange={e => setSearch(e.target.value)} style={{ ...S.input, flex: 1, minWidth: 140 }} />
      </div>

      {filtered.length === 0
        ? <EmptyState icon="verify" title="Sin resultados" sub="Prueba con otro filtro o búsqueda." />
        : wide
          ? <PartsTable parts={filtered} onVerify={onVerify} onPhysQty={onPhysQty} plantsMeta={plantsMeta} />
          : <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>{filtered.map(p => <PartCard key={p.id} part={p} onVerify={onVerify} onPhysQty={onPhysQty} plantsMeta={plantsMeta} />)}</div>
      }

      <div style={{ marginTop: 20, borderTop: "1px solid #e5e7eb", paddingTop: 16 }}>
        <button onClick={() => setShowAuditDialog(true)} style={{ ...S.btn("primary"), width: "100%", justifyContent: "center", background: plantColor || "#2563eb", padding: "12px 14px", fontSize: 14, fontWeight: 700, borderRadius: 10 }}>
          <Icon name="audit" size={15} color="#fff" /> Finalizar auditoría
        </button>
      </div>
    </div>
  );
}

// ─── Plant Audit Panel ────────────────────────────────────────────────────────
function PlantAuditPanel({ audits, wide, plantColor, onDelete, users, handleUpdateAuditDate }) {
  const [open, setOpen] = useState(null);
  const [auditFilter, setAuditFilter] = useState("all");
  const [auditDetailFilter, setAuditDetailFilter] = useState("all");
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [sfFilter, setSfFilter] = useState("all");

  const openAudit = audits.find(a => a.id === open);

  if (open && openAudit) {
    const diffs = openAudit.snapshot.filter(p => p.diff !== null && p.diff !== 0);
    const verified = openAudit.snapshot.filter(p => p.verified);
    const pending = openAudit.snapshot.filter(p => !p.verified);
    const displayedSnapshot = auditDetailFilter === "verified" ? openAudit.snapshot.filter(p => p.verified)
      : auditDetailFilter === "diffs" ? openAudit.snapshot.filter(p => p.diff !== null && p.diff !== 0)
      : auditDetailFilter === "pending" ? openAudit.snapshot.filter(p => !p.verified)
      : openAudit.snapshot;
    const totalVariance = openAudit.snapshot.reduce((s, p) => s + (p.diff && p.diff !== 0 ? p.diff * p.unitValue : 0), 0);
    const detailTiles = [
      { id: "all",      label: "Total ítems",    value: fmtN(openAudit.totalItems),    color: "#374151", bg: "#f9fafb", border: "#e5e7eb" },
      { id: "verified", label: "Verificados",     value: fmtN(openAudit.verifiedItems), color: "#166534", bg: "#f0fdf4", border: "#bbf7d0" },
      { id: "diffs",    label: "Con diferencias", value: fmtN(openAudit.diffItems),     color: openAudit.diffItems > 0 ? "#dc2626" : "#6b7280", bg: openAudit.diffItems > 0 ? "#fef2f2" : "#f9fafb", border: openAudit.diffItems > 0 ? "#fecaca" : "#e5e7eb" },
      { id: "pending",  label: "Pendientes",      value: fmtN(openAudit.totalItems - openAudit.verifiedItems), color: "#92400e", bg: "#fffbeb", border: "#fde68a" },
    ];
    return (
      <div>
        <button onClick={() => setOpen(null)} style={{ display: "inline-flex", alignItems: "center", gap: 8, minHeight: 44, padding: "0 16px 0 10px", marginBottom: 14, background: "#f1f5f9", border: "1.5px solid #cbd5e1", borderRadius: 10, cursor: "pointer", fontSize: 14, fontWeight: 600, color: "#1e40af" }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg> Volver al historial
        </button>

        {/* Audit header */}
        <div style={{ ...S.card, marginBottom: 16, borderLeft: `4px solid ${plantColor || "#2563eb"}` }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 8, marginBottom: 10 }}>
            <div>
              <div style={{ fontWeight: 700, fontSize: 15, color: "#111827" }}>
                Auditoría — {new Date(openAudit.date).toLocaleDateString("es-CL", { day: "2-digit", month: "short", year: "numeric" })}
              </div>
              <div style={{ fontSize: 12, color: "#6b7280", marginTop: 2 }}>
                {new Date(openAudit.date).toLocaleTimeString("es-CL", { hour: "2-digit", minute: "2-digit" })} · Auditor: {resolveUser(openAudit, users)}
              </div>
            </div>
            <span style={{ ...S.badge(openAudit.status === "Completado" ? "#16a34a" : "#b45309", openAudit.status === "Completado" ? "#f0fdf4" : "#fffbeb") }}>
              {openAudit.status}
            </span>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 8 }}>
            {detailTiles.map(t => {
              const isActive = auditDetailFilter === t.id;
              return (
                <div key={t.id} onClick={() => setAuditDetailFilter(f => f === t.id ? "all" : t.id)} style={{
                  background: t.bg, border: `${isActive ? 2 : 1}px solid ${isActive ? t.color : t.border}`,
                  borderRadius: 8, padding: "8px 12px", cursor: "pointer",
                  boxShadow: isActive ? `0 0 0 2px ${t.color}25` : "none",
                }}>
                  <div style={{ fontSize: 11, color: "#6b7280" }}>{t.label}</div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: t.color, marginTop: 2 }}>{t.value}</div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Snapshot list (filtered by detail filter) */}
        <div>
          <div style={{ fontSize: 13, fontWeight: 600, color: "#374151", marginBottom: 8 }}>
            {auditDetailFilter === "all" ? `Todos los ítems (${openAudit.snapshot.length})` : auditDetailFilter === "verified" ? `Verificados (${verified.length})` : auditDetailFilter === "diffs" ? `Con diferencias (${diffs.length})` : `Pendientes (${pending.length})`}
          </div>
          {totalVariance !== 0 && (
            <div style={{ fontSize: 12, color: totalVariance < 0 ? "#dc2626" : "#16a34a", fontWeight: 600, marginBottom: 10 }}>
              Varianza monetaria total: <span style={{ fontSize: 13 }}>{totalVariance > 0 ? "+" : ""}{fmtCLP(totalVariance)}</span>
            </div>
          )}
          {wide ? (
            <div style={{ ...S.card, padding: 0, overflow: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 620 }}>
                <thead><tr>
                  <th style={S.th}>Código</th>
                  <th style={S.th}>Nombre</th>
                  <th style={{ ...S.th, textAlign: "right" }}>Sistema</th>
                  <th style={{ ...S.th, textAlign: "right" }}>Físico</th>
                  <th style={{ ...S.th, textAlign: "right" }}>Dif.</th>
                  <th style={{ ...S.th, textAlign: "right" }}>Valor total</th>
                  <th style={{ ...S.th, textAlign: "right", color: "#b91c1c" }}>Varianza ($)</th>
                </tr></thead>
                <tbody>
                  {displayedSnapshot.map(p => {
                    const hasDiff = p.diff !== null && p.diff !== 0;
                    const diffVal = hasDiff ? p.diff * p.unitValue : null;
                    return (
                      <tr key={p.id} style={{ background: hasDiff ? "#fef9f9" : p.verified ? "#f9fefb" : "transparent" }}>
                        <td style={S.td}><span style={{ fontFamily: "monospace", fontSize: 11 }}>{p.code}</span></td>
                        <td style={{ ...S.td, maxWidth: 200 }}>{p.name}</td>
                        <td style={{ ...S.td, textAlign: "right" }}>{fmtN(p.systemQty)} {p.unit}</td>
                        <td style={{ ...S.td, textAlign: "right" }}>{p.physicalQty !== null ? `${fmtN(p.physicalQty)} ${p.unit}` : <span style={{ color: "#6b7280" }}>—</span>}</td>
                        <td style={{ ...S.td, textAlign: "right" }}>
                          {hasDiff ? <span style={{ fontWeight: 700, color: p.diff < 0 ? "#dc2626" : "#16a34a" }}>{p.diff > 0 ? "+" : ""}{fmtN(p.diff)}</span> : <span style={{ color: "#6b7280" }}>—</span>}
                        </td>
                        <td style={{ ...S.td, textAlign: "right", fontWeight: 600 }}>{fmtCLP((p.physicalQty ?? p.systemQty) * p.unitValue)}</td>
                        <td style={{ ...S.td, textAlign: "right" }}>
                          {diffVal !== null ? <span style={{ fontWeight: 700, color: diffVal < 0 ? "#dc2626" : "#16a34a" }}>{diffVal > 0 ? "+" : ""}{fmtCLP(diffVal)}</span> : <span style={{ color: "#6b7280" }}>—</span>}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              {displayedSnapshot.map(p => {
                const hasDiff = p.diff !== null && p.diff !== 0;
                const diffVal = hasDiff ? p.diff * p.unitValue : null;
                return (
                  <div key={p.id} style={{ ...S.card, padding: "10px 12px", border: `1px solid ${hasDiff ? "#fecaca" : p.verified ? "#bbf7d0" : "#e5e7eb"}` }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                      <span style={{ fontSize: 11, color: "#6b7280", fontFamily: "monospace" }}>{p.code}</span>
                      <span style={{ fontSize: 11, color: p.verified ? "#16a34a" : "#9ca3af", fontWeight: 500 }}>{p.verified ? "✓ verificado" : "pendiente"}</span>
                    </div>
                    <div style={{ fontSize: 13, fontWeight: 500, marginBottom: 4, lineHeight: 1.3 }}>{p.name}</div>
                    <div style={{ display: "flex", gap: 12, fontSize: 12, color: "#6b7280", flexWrap: "wrap" }}>
                      <span>Sist: <strong style={{ color: "#111827" }}>{fmtN(p.systemQty)}</strong></span>
                      <span>Fís: <strong style={{ color: hasDiff ? "#dc2626" : "#111827" }}>{p.physicalQty !== null ? fmtN(p.physicalQty) : "—"}</strong></span>
                      {hasDiff && <span style={{ fontWeight: 700, color: p.diff < 0 ? "#dc2626" : "#16a34a" }}>{p.diff > 0 ? "+" : ""}{fmtN(p.diff)}</span>}
                      {diffVal !== null && <span style={{ fontWeight: 700, color: diffVal < 0 ? "#dc2626" : "#16a34a" }}>{diffVal > 0 ? "+" : ""}{fmtCLP(diffVal)}</span>}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    );
  }

  if (!audits.length) return (
    <EmptyState icon="audit" title="Sin auditorías registradas" sub="Ve a Verificación, completa la revisión y guarda una auditoría." />
  );

  const completado = audits.filter(a => a.status === "Completado").length;
  const sfOptions = Object.entries(audits.filter(a => a.sfCode).reduce((acc, a) => { if (!acc[a.sfCode]) acc[a.sfCode] = a.sfName; return acc; }, {})).sort((a, b) => a[0].localeCompare(b[0]));
  const filteredAudits = audits.filter(a =>
    (auditFilter === "all" || a.status === "Completado") &&
    (sfFilter === "all" || a.sfCode === sfFilter)
  );

  return (
    <div>
      {deleteConfirm && <ConfirmDialog title="Eliminar auditoría" message="Esta acción no se puede deshacer." confirmLabel="Eliminar" danger onConfirm={() => { onDelete(deleteConfirm); setDeleteConfirm(null); if (open === deleteConfirm) setOpen(null); }} onCancel={() => setDeleteConfirm(null)} />}

      {/* Filter chips */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 8, marginBottom: 14 }}>
        {[
          { id: "all",        label: "Todas",       count: audits.length, color: "#374151", bg: "#f9fafb", border: "#e5e7eb" },
          { id: "completado", label: "Completadas",  count: completado,    color: "#166534", bg: "#f0fdf4", border: "#bbf7d0" },
        ].map(t => {
          const isActive = auditFilter === t.id;
          return (
            <div key={t.id} onClick={() => setAuditFilter(f => f === t.id ? "all" : t.id)} style={{
              background: t.bg, border: `${isActive ? 2 : 1}px solid ${isActive ? t.color : t.border}`,
              borderRadius: 8, padding: "8px 10px", textAlign: "center", cursor: "pointer",
              boxShadow: isActive ? `0 0 0 2px ${t.color}25` : "none",
            }}>
              <div style={{ fontSize: 16, fontWeight: 700, color: t.color }}>{t.count}</div>
              <div style={{ fontSize: 10, color: t.color, opacity: 0.75, fontWeight: 500 }}>{t.label}</div>
            </div>
          );
        })}
      </div>
      {sfOptions.length > 0 && (
        <select value={sfFilter} onChange={e => setSfFilter(e.target.value)} style={{ ...S.input, marginBottom: 10 }}>
          <option value="all">Todas las subfamilias</option>
          {sfOptions.map(([code, name]) => <option key={code} value={code}>{code} — {name}</option>)}
        </select>
      )}
      <div style={{ fontSize: 13, color: "#6b7280", marginBottom: 12 }}>{filteredAudits.length} auditoría{filteredAudits.length !== 1 ? "s" : ""} · Orden cronológico inverso</div>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {filteredAudits.map(a => {
          const pct = a.totalItems ? Math.round((a.verifiedItems / a.totalItems) * 100) : 0;
          return (
            <div key={a.id} style={{ ...S.card, border: `1px solid ${a.status === "Completado" ? "#bbf7d0" : "#fde68a"}` }}>
              {/* Header row */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 6 }}>
                <div style={{ flex: 1, minWidth: 0 }}>
                  {a.sfName && <div style={{ fontWeight: 700, fontSize: 15, color: "#111827", marginBottom: 2 }}>{a.sfCode} - {a.sfName}</div>}
                  <div style={{ fontSize: 12, color: "#6b7280" }}>Auditor: {resolveUser(a, users)}</div>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 1, flexWrap: "wrap" }}>
                    <div style={{ fontSize: 12, color: "#6b7280" }}>
                      {new Date(a.date).toLocaleDateString("es-CL", { day: "2-digit", month: "short", year: "numeric" })} · {new Date(a.date).toLocaleTimeString("es-CL", { hour: "2-digit", minute: "2-digit" })}
                    </div>
                    {handleUpdateAuditDate && a.status === "Borrador" && (
                      <input type="date" defaultValue={a.date.slice(0, 10)}
                        onChange={e => e.target.value && handleUpdateAuditDate(a.id, e.target.value)}
                        title="Editar fecha"
                        style={{ ...S.input, fontSize: 11, padding: "2px 6px", width: 130 }} />
                    )}
                  </div>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 6, flexShrink: 0, marginLeft: 8 }}>
                  <span style={{ ...S.badge(a.status === "Completado" ? "#16a34a" : a.status === "Borrador" ? "#6b7280" : "#b45309", a.status === "Completado" ? "#f0fdf4" : a.status === "Borrador" ? "#f3f4f6" : "#fffbeb") }}>{a.status}</span>
                </div>
              </div>
              {/* Stats */}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 8, marginBottom: 8 }}>
                {(() => {
                  const av = a.snapshot.reduce((s, p) => s + (p.diff && p.diff !== 0 ? p.diff * p.unitValue : 0), 0);
                  return [["Ítems", fmtN(a.totalItems)], ["Verificados", fmtN(a.verifiedItems)], ["Diferencias", fmtN(a.diffItems)], ["Varianza", fmtCLP(av)]].map(([l, v]) => (
                    <div key={l}>
                      <div style={{ fontSize: 10, color: "#374151" }}>{l}</div>
                      <div style={{ fontSize: 12, fontWeight: 600, color: l === "Diferencias" && a.diffItems > 0 ? "#dc2626" : l === "Varianza" && av < 0 ? "#dc2626" : l === "Varianza" && av > 0 ? "#16a34a" : "#111827" }}>{v}</div>
                    </div>
                  ));
                })()}
              </div>
              <div style={{ background: "#f3f4f6", borderRadius: 3, height: 4, marginBottom: 10 }}>
                <div style={{ width: `${pct}%`, height: "100%", background: a.status === "Completado" ? "#16a34a" : (plantColor || "#2563eb"), borderRadius: 3 }} />
              </div>
              {/* Actions */}
              <div style={{ display: "flex", gap: 6 }}>
                <button onClick={() => setOpen(a.id)} style={{ ...S.btn(), flex: 1, justifyContent: "center", fontSize: 12 }}>
                  <Icon name="audit" size={12} color="#6b7280" /> Ver detalle
                </button>
                {a.status === "Completado" && (
                  <button onClick={() => exportAuditXLSX(a, users)} style={{ ...S.btn(), fontSize: 12, padding: "6px 10px", color: "#166534", border: "1px solid #86efac" }} title="Exportar Excel">
                    <Icon name="upload" size={12} color="#166534" />
                  </button>
                )}
                <button onClick={() => setDeleteConfirm(a.id)} style={{ ...S.btn("danger"), fontSize: 12, padding: "6px 10px" }}>
                  <Icon name="trash" size={12} color="#dc2626" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── Settings ─────────────────────────────────────────────────────────────────
// ─── Plants CRUD ──────────────────────────────────────────────────────────────
const PLANT_COLORS = [
  { color: "#2563eb", bg: "#eff6ff", label: "Azul" },
  { color: "#166534", bg: "#f0fdf4", label: "Verde" },
  { color: "#6b21a8", bg: "#faf5ff", label: "Violeta" },
  { color: "#9a3412", bg: "#fff7ed", label: "Naranja" },
  { color: "#155e75", bg: "#ecfeff", label: "Cyan" },
  { color: "#3f6212", bg: "#f7fee7", label: "Lima" },
  { color: "#92400e", bg: "#fffbeb", label: "Ámbar" },
  { color: "#b91c1c", bg: "#fef2f2", label: "Rojo" },
  { color: "#7c3aed", bg: "#f5f3ff", label: "Púrpura" },
  { color: "#0f766e", bg: "#f0fdfa", label: "Teal" },
  { color: "#1e3a8a", bg: "#eff6ff", label: "Marino" },
  { color: "#4f46e5", bg: "#eef2ff", label: "Índigo" },
  { color: "#059669", bg: "#ecfdf5", label: "Esmeralda" },
  { color: "#ea580c", bg: "#fff7ed", label: "Coral" },
  { color: "#be185d", bg: "#fdf2f8", label: "Fucsia" },
  { color: "#86198f", bg: "#fdf4ff", label: "Ciruela" },
  { color: "#06b6d4", bg: "#ecfeff", label: "Turquesa" },
  { color: "#451a03", bg: "#fffbeb", label: "Café" },
  { color: "#475569", bg: "#f8fafc", label: "Gris" },
  { color: "#1e293b", bg: "#f1f5f9", label: "Pizarra" },
  { color: "#ca8a04", bg: "#fefce8", label: "Amarillo" },
  { color: "#84cc16", bg: "#f7fee7", label: "Chartreuse" },
  { color: "#22c55e", bg: "#f0fdf4", label: "Verde primavera" },
  { color: "#5eead4", bg: "#f0fdfa", label: "Menta" },
  { color: "#38bdf8", bg: "#f0f9ff", label: "Celeste" },
  { color: "#64748b", bg: "#f8fafc", label: "Acero" },
  { color: "#94a3b8", bg: "#f8fafc", label: "Perla" },
  { color: "#0f172a", bg: "#f1f5f9", label: "Carbón" },
  { color: "#a78bfa", bg: "#f5f3ff", label: "Lavanda" },
  { color: "#c026d3", bg: "#fdf4ff", label: "Orquídea" },
  { color: "#f472b6", bg: "#fdf2f8", label: "Rosa" },
  { color: "#831843", bg: "#fdf2f8", label: "Vino" },
  { color: "#7f1d1d", bg: "#fef2f2", label: "Granate" },
  { color: "#dc2626", bg: "#fef2f2", label: "Bermellón" },
  { color: "#57534e", bg: "#fafaf9", label: "Tierra" },
  { color: "#fdba74", bg: "#fff7ed", label: "Melón" },
  { color: "#334155", bg: "#f8fafc", label: "Grafito" },
  { color: "#78716c", bg: "#fafaf9", label: "Musgo" },
  { color: "#2dd4bf", bg: "#f0fdfa", label: "Aguamarina" },
  { color: "#713f12", bg: "#fffbeb", label: "Sepia" },
];

function PlantsCrudPage({ plantsMeta, setPlantsMeta, navigate, showToast, wide, inv, setInv, setHistory, setAudits, setSubfamilies }) {
  const [search, setSearch] = useState("");
  const [editCode, setEditCode] = useState(null); // null=list, ""=new, "P3"=edit
  const [deleteCode, setDeleteCode] = useState(null);
  const [formErr, setFormErr] = useState({});
  const [formName, setFormName] = useState("");
  const [formCode, setFormCode] = useState("");
  const [formColor, setFormColor] = useState(PLANT_COLORS[0].color);
  const [formBodega, setFormBodega] = useState("");
  const [leaveConfirm, setLeaveConfirm] = useState(null);

  const allPlants = sortedPlantEntries(plantsMeta).map(([code, m]) => ({ code, ...m }));
  const filtered = allPlants.filter(p => {
    const q = search.toLowerCase();
    return !q || p.code.toLowerCase().includes(q) || p.name.toLowerCase().includes(q);
  }).sort((a, b) => a.code.localeCompare(b.code));

  const origRef = React.useRef(null);
  const prevEdit = React.useRef(undefined);
  if (editCode !== prevEdit.current) {
    prevEdit.current = editCode;
    if (editCode !== null) {
      if (editCode === "") {
        setFormCode(""); setFormName(""); setFormColor(PLANT_COLORS[0].color); setFormBodega("");
        origRef.current = { code: "", name: "", color: PLANT_COLORS[0].color, bodega: "" };
      } else {
        const m = plantsMeta[editCode] || {};
        setFormCode(editCode); setFormName(m.name || ""); setFormColor(m.color || PLANT_COLORS[0].color); setFormBodega(m.bodega || "");
        origRef.current = { code: editCode, name: m.name || "", color: m.color || PLANT_COLORS[0].color, bodega: m.bodega || "" };
      }
      setFormErr({});
    }
  }

  function isDirtyPlant() {
    const o = origRef.current;
    if (!o) return false;
    return formCode !== o.code || formName !== o.name || formColor !== o.color || formBodega !== o.bodega;
  }
  function guardedExitPlant(fn) { if (isDirtyPlant()) { setLeaveConfirm(() => fn); } else { fn(); } }

  function validate() {
    const err = {};
    if (!formCode.trim()) err.code = "Requerido";
    else if (!/^[A-Z0-9_-]+$/i.test(formCode.trim())) err.code = "Solo letras, números, guiones";
    if (!formName.trim()) err.name = "Requerido";
    if (!formBodega.trim()) err.bodega = "Requerido";
    return err;
  }

  function handleSave() {
    const err = validate();
    if (Object.keys(err).length) { setFormErr(err); return; }
    const code = formCode.trim().toUpperCase();
    const isNew = editCode === "";
    if (isNew && plantsMeta[code]) { setFormErr({ code: "Código ya existe" }); return; }
    if (!isNew && code !== editCode && plantsMeta[code]) { setFormErr({ code: "Código ya existe" }); return; }
    const colorEntry = PLANT_COLORS.find(c => c.color === formColor) || PLANT_COLORS[0];
    if (isNew) {
      setPlantsMeta(prev => ({ ...prev, [code]: { name: formName.trim(), bodega: formBodega.trim(), color: formColor, bg: colorEntry.bg, active: true } }));
      showToast("Planta creada");
    } else {
      const oldCode = editCode;
      setPlantsMeta(prev => {
        const existing = prev[oldCode] || {};
        const next = { ...prev };
        if (code !== oldCode) delete next[oldCode];
        next[code] = { ...existing, name: formName.trim(), bodega: formBodega.trim(), color: formColor, bg: colorEntry.bg, active: existing.active !== false };
        return next;
      });
      // Cascade code rename to related state
      if (code !== oldCode) {
        setInv(prev => {
          const next = {};
          Object.values(prev).forEach(p => {
            const updated = p.plantCode === oldCode ? { ...p, plantCode: code } : p;
            next[updated.id] = updated;
          });
          return next;
        });
        setHistory(prev => prev.map(h => h.plantCode === oldCode ? { ...h, plantCode: code } : h));
        setAudits(prev => prev.map(a => a.plantCode === oldCode ? { ...a, plantCode: code } : a));
        setSubfamilies(prev => prev.map(s => s.plantCode === oldCode ? { ...s, plantCode: code } : s));
      }
      showToast("Planta actualizada");
    }
    setEditCode(null); setFormErr({});
  }

  function handleDelete(code) {
    setPlantsMeta(prev => { const n = { ...prev }; delete n[code]; return n; });
    setDeleteCode(null); showToast("Planta eliminada");
  }

  // Form view
  if (editCode !== null) {
    const isNew = editCode === "";
    return (
      <div style={{ width: "100%", maxWidth: "min(100%, 1040px)" }}>
        {leaveConfirm && <ConfirmDialog title="Cambios sin guardar" message="Tienes cambios sin guardar. Si sales, se perderán los datos. ¿Deseas salir?" confirmLabel="Salir sin guardar" cancelLabel="Cancelar" danger onConfirm={() => { setLeaveConfirm(null); leaveConfirm(); }} onCancel={() => setLeaveConfirm(null)} />}
        <Breadcrumb items={[
          { label: "Ajustes", onClick: () => guardedExitPlant(() => { setEditCode(null); navigate("settings"); }) },
          { label: "Plantas", onClick: () => guardedExitPlant(() => setEditCode(null)) },
          { label: isNew ? "Nueva planta" : "Editar planta" },
        ]} />
        <div style={S.card}>
          <div style={{ fontWeight: 700, fontSize: 15, color: "#111827", marginBottom: 18 }}>
            {isNew ? "Nueva planta" : "Editar planta"}
          </div>

          {/* Código */}
          <div style={{ marginBottom: 14 }}>
            <label style={{ fontSize: 12, fontWeight: 600, color: "#374151", display: "block", marginBottom: 5 }}>Código de planta</label>
            <input value={formCode} onChange={e => { setFormCode(e.target.value); setFormErr(f => ({ ...f, code: undefined })); }}
              placeholder="Ej: P7"
              style={{ ...S.input, width: "100%", border: `1px solid ${formErr.code ? "#dc2626" : "#d1d5db"}`, boxSizing: "border-box" }} />
            {formErr.code && <div style={{ fontSize: 11, color: "#b91c1c", marginTop: 3 }}>{formErr.code}</div>}
          </div>

          {/* Nombre */}
          <div style={{ marginBottom: 14 }}>
            <label style={{ fontSize: 12, fontWeight: 600, color: "#374151", display: "block", marginBottom: 5 }}>Nombre de planta</label>
            <input value={formName} onChange={e => { setFormName(e.target.value); setFormErr(f => ({ ...f, name: undefined })); }}
              placeholder="Ej: Planta 7"
              style={{ ...S.input, width: "100%", border: `1px solid ${formErr.name ? "#dc2626" : "#d1d5db"}`, boxSizing: "border-box" }} />
            {formErr.name && <div style={{ fontSize: 11, color: "#b91c1c", marginTop: 3 }}>{formErr.name}</div>}
          </div>


          {/* Bodega */}
          <div style={{ marginBottom: 14 }}>
            <label style={{ fontSize: 12, fontWeight: 600, color: "#374151", display: "block", marginBottom: 5 }}>Bodega <span style={{ color: "#b91c1c" }}>*</span></label>
            <input value={formBodega} onChange={e => { setFormBodega(e.target.value); setFormErr(f => ({ ...f, bodega: undefined })); }}
              placeholder="Ej: Bodega Central"
              style={{ ...S.input, width: "100%", border: `1px solid ${formErr.bodega ? "#dc2626" : "#d1d5db"}`, boxSizing: "border-box" }} />
            {formErr.bodega && <div style={{ fontSize: 11, color: "#b91c1c", marginTop: 3 }}>{formErr.bodega}</div>}
          </div>

          {/* Color */}
          <div style={{ marginBottom: 14 }}>
            <label style={{ fontSize: 12, fontWeight: 600, color: "#374151", display: "block", marginBottom: 8 }}>Color</label>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {PLANT_COLORS.map(c => (
                <button key={c.color} onClick={() => setFormColor(c.color)}
                  title={c.label}
                  style={{ width: 28, height: 28, borderRadius: 6, background: c.color, border: formColor === c.color ? "3px solid #111827" : "2px solid transparent", cursor: "pointer", outline: "none" }} />
              ))}
            </div>
            <div style={{ marginTop: 8, display: "flex", alignItems: "center", gap: 8 }}>
              <div style={{ width: 20, height: 20, borderRadius: 4, background: formColor }} />
              <span style={{ fontSize: 12, color: "#374151" }}>{PLANT_COLORS.find(c => c.color === formColor)?.label || "Personalizado"}</span>
            </div>
          </div>

          <div style={{ display: "flex", gap: 10, justifyContent: "flex-end", flexWrap: "wrap" }}>
            <button onClick={() => guardedExitPlant(() => { setEditCode(null); setFormErr({}); })} style={S.btn()}>Cancelar</button>
            <button onClick={handleSave} style={{ ...S.btn("primary"), background: "#2563eb" }}>
              <Icon name="save" size={13} color="#fff" /> {isNew ? "Crear" : "Guardar cambios"}
            </button>
          </div>
        </div>
      </div>
    );
  }

  // List view
  return (
    <div>
      <Breadcrumb items={[
        { label: "Ajustes", onClick: () => navigate("settings") },
        { label: "Plantas" },
      ]} />
      <PageHeader title="Plantas" subtitle={`${fmtN(allPlants.length)} plantas`} />

      {/* Toolbar */}
      <div style={{ display: "flex", gap: 10, marginBottom: 16, flexWrap: "wrap" }}>
        <input value={search} onChange={e => setSearch(e.target.value)}
          placeholder="Buscar por código o nombre..."
          style={{ ...S.input, flex: "1 1 180px" }} />
        <button onClick={() => setEditCode("")} style={{ ...S.btn("primary"), background: "#2563eb", flexShrink: 0 }}>
          <Icon name="plus" size={14} color="#fff" /> Nueva
        </button>
      </div>

      <div style={{ fontSize: 12, color: "#6b7280", marginBottom: 10 }}>
        {filtered.length} resultado{filtered.length !== 1 ? "s" : ""}{search ? ` · filtrado de ${allPlants.length}` : ""}
      </div>

      {filtered.length === 0 ? (
        <EmptyState icon="plant" title="Sin resultados" sub="Prueba con otro término de búsqueda o filtro." />
      ) : wide ? (
        <div style={{ ...S.card, padding: 0, overflow: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 420 }}>
            <thead>
              <tr>
                <th style={S.th}>Código</th>
                <th style={S.th}>Nombre</th>
                <th style={S.th}>Bodega</th>
                <th style={S.th}>Color</th>
                <th style={{ ...S.th, width: 110 }}></th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(p => (
                <tr key={p.code} style={{ borderBottom: "1px solid #f3f4f6" }}>
                  <td style={{ ...S.td, fontFamily: "monospace", fontWeight: 700 }}>{p.code}</td>
                  <td style={S.td}>{p.name}</td>
                  <td style={{ ...S.td, color: "#6b7280" }}>{p.bodega || <span style={{ color: "#d1d5db" }}>—</span>}</td>
                  <td style={S.td}>
                    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                      <div style={{ width: 14, height: 14, borderRadius: 3, background: p.color }} />
                      <span style={{ ...S.badge(p.color, p.bg) }}>{p.code}</span>
                    </div>
                  </td>
                  <td style={{ ...S.td, textAlign: "right" }}>
                    <div style={{ display: "flex", gap: 6, justifyContent: "flex-end" }}>
                      <button onClick={() => setEditCode(p.code)} style={{ ...S.btn(), padding: "4px 10px", fontSize: 12 }}>
                        <Icon name="edit" size={12} color="#6b7280" /> Editar
                      </button>
                      <button onClick={() => setDeleteCode(p.code)} style={{ ...S.btn(), padding: "4px 10px", fontSize: 12, color: "#b91c1c", border: "1px solid #fecaca" }}>
                        <Icon name="trash" size={12} color="#dc2626" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {filtered.map(p => (
            <div key={p.code} style={{ ...S.card, display: "flex", alignItems: "center", gap: 12, padding: "12px 14px", borderLeft: `3px solid ${p.color}` }}>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ marginBottom: 3 }}>
                  <span style={{ fontFamily: "monospace", fontSize: 12, fontWeight: 700, color: p.color }}>{p.code}</span>
                </div>
                <div style={{ fontSize: 13, color: "#111827" }}>{p.name}</div>
                {p.bodega && <div style={{ fontSize: 11, color: "#6b7280", marginTop: 2 }}>{p.bodega}</div>}
              </div>
              <div style={{ display: "flex", gap: 6, flexShrink: 0 }}>
                <button onClick={() => setEditCode(p.code)} style={{ ...S.btn(), padding: "6px 10px" }}>
                  <Icon name="edit" size={14} color="#6b7280" />
                </button>
                <button onClick={() => setDeleteCode(p.code)} style={{ ...S.btn(), padding: "6px 10px", border: "1px solid #fecaca" }}>
                  <Icon name="trash" size={14} color="#dc2626" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {deleteCode && (
        <ConfirmDialog
          title="Eliminar planta"
          message={`¿Eliminar "${plantsMeta[deleteCode]?.name}" (${deleteCode})?\nSe eliminará de los selectores. El inventario existente no se modifica.\nEsta acción no se puede deshacer.`}
          confirmLabel="Eliminar"
          danger
          onConfirm={() => handleDelete(deleteCode)}
          onCancel={() => setDeleteCode(null)}
        />
      )}
    </div>
  );
}

// ─── Subfamilies CRUD ─────────────────────────────────────────────────────────
function SubfamiliesCrudPage({ subfamilies, setSubfamilies, navigate, showToast, wide, plantsMeta, setInv, setAudits }) {
  const [search, setSearch] = useState("");
  const [plantFilter, setPlantFilter] = useState("all");
  const [editItem, setEditItem] = useState(null);   // null=list, {}=new, {code,...}=edit
  const [deleteId, setDeleteId] = useState(null);
  const [formErr, setFormErr] = useState({});
  const [formCode, setFormCode] = useState("");
  const [formName, setFormName] = useState("");
  const [formPlant, setFormPlant] = useState("");
  const [formActive, setFormActive] = useState(true);
  const [leaveConfirm, setLeaveConfirm] = useState(null);

  const plants = sortedPlantEntries(plantsMeta).filter(([, m]) => m.active).map(([code, m]) => ({ code, name: m.name }));

  // Sync form fields when editItem changes
  const origRef = React.useRef(null);
  const prevEditRef = React.useRef(null);
  if (editItem !== prevEditRef.current) {
    prevEditRef.current = editItem;
    if (editItem !== null) {
      const code0 = editItem.code || "";
      const name0 = editItem.name || "";
      const plant0 = editItem.plantCode || plants[0]?.code || "";
      const active0 = editItem.active !== false;
      setFormCode(code0); setFormName(name0); setFormPlant(plant0); setFormActive(active0);
      origRef.current = { code: code0, name: name0, plant: plant0, active: active0 };
      setFormErr({});
    }
  }

  function isDirtySf() {
    const o = origRef.current;
    if (!o) return false;
    return formCode !== o.code || formName !== o.name || formPlant !== o.plant || formActive !== o.active;
  }
  function guardedExitSf(fn) { if (isDirtySf()) { setLeaveConfirm(() => fn); } else { fn(); } }

  const filtered = subfamilies.filter(sf => {
    const q = search.toLowerCase();
    const matchQ = !q || sf.code.toLowerCase().includes(q) || sf.name.toLowerCase().includes(q);
    const matchP = plantFilter === "all" || sf.plantCode === plantFilter;
    return matchQ && matchP;
  }).sort((a, b) => a.code.localeCompare(b.code));

  function validate() {
    const err = {};
    if (!formCode.trim()) err.code = "Requerido";
    else if (!/^[A-Z0-9_-]+$/i.test(formCode.trim())) err.code = "Solo letras, números, guiones";
    if (!formName.trim()) err.name = "Requerido";
    if (!formPlant) err.plantCode = "Requerido";
    return err;
  }

  function handleSave() {
    const err = validate();
    if (Object.keys(err).length) { setFormErr(err); return; }
    const code = formCode.trim().toUpperCase();
    const isNew = !editItem.code;
    const oldCode = editItem.code;
    if (isNew && subfamilies.some(s => s.code === code)) { setFormErr({ code: "Código ya existe" }); return; }
    if (!isNew && code !== oldCode && subfamilies.some(s => s.code === code)) { setFormErr({ code: "Código ya existe" }); return; }
    if (isNew) {
      setSubfamilies(prev => [...prev, { code, name: formName.trim(), plantCode: formPlant, active: formActive }]);
      showToast("Subfamilia creada");
    } else {
      setSubfamilies(prev => prev.map(s => s.code === oldCode ? { code, name: formName.trim(), plantCode: formPlant, active: formActive } : s));
      if (code !== oldCode) {
        setInv(prev => {
          const next = {};
          Object.values(prev).forEach(p => {
            const updated = p.subfamilyCode === oldCode ? { ...p, subfamilyCode: code } : p;
            next[updated.id] = updated;
          });
          return next;
        });
        setAudits(prev => prev.map(a => a.sfCode === oldCode ? { ...a, sfCode: code } : a));
      }
      showToast("Subfamilia actualizada");
    }
    setEditItem(null); setFormErr({});
  }

  function handleDelete(code) {
    setSubfamilies(prev => prev.filter(s => s.code !== code));
    setDeleteId(null); showToast("Subfamilia eliminada");
  }

  // Form view
  if (editItem !== null) {
    const isNew = !editItem.code;
    return (
      <div style={{ width: "100%", maxWidth: "min(100%, 1040px)" }}>
        {leaveConfirm && <ConfirmDialog title="Cambios sin guardar" message="Tienes cambios sin guardar. Si sales, se perderán los datos. ¿Deseas salir?" confirmLabel="Salir sin guardar" cancelLabel="Cancelar" danger onConfirm={() => { setLeaveConfirm(null); leaveConfirm(); }} onCancel={() => setLeaveConfirm(null)} />}
        <Breadcrumb items={[
          { label: "Ajustes", onClick: () => guardedExitSf(() => { setEditItem(null); navigate("settings"); }) },
          { label: "Subfamilias", onClick: () => guardedExitSf(() => setEditItem(null)) },
          { label: isNew ? "Nueva subfamilia" : "Editar subfamilia" },
        ]} />
        <div style={S.card}>
          <div style={{ fontWeight: 700, fontSize: 15, color: "#111827", marginBottom: 18 }}>
            {isNew ? "Nueva subfamilia" : "Editar subfamilia"}
          </div>

          {/* Código */}
          <div style={{ marginBottom: 14 }}>
            <label style={{ fontSize: 12, fontWeight: 600, color: "#374151", display: "block", marginBottom: 5 }}>Código de subfamilia</label>
            <input
              value={formCode}
              onChange={e => { setFormCode(e.target.value); setFormErr(f => ({ ...f, code: undefined })); }}
              placeholder="Ej: R099"
              style={{ ...S.input, width: "100%", border: `1px solid ${formErr.code ? "#dc2626" : "#d1d5db"}`, boxSizing: "border-box" }}
            />
            {formErr.code && <div style={{ fontSize: 11, color: "#b91c1c", marginTop: 3 }}>{formErr.code}</div>}
          </div>

          {/* Nombre */}
          <div style={{ marginBottom: 14 }}>
            <label style={{ fontSize: 12, fontWeight: 600, color: "#374151", display: "block", marginBottom: 5 }}>Nombre de subfamilia</label>
            <input
              value={formName}
              onChange={e => { setFormName(e.target.value); setFormErr(f => ({ ...f, name: undefined })); }}
              placeholder="Ej: Envasadora Multivac R-145"
              style={{ ...S.input, width: "100%", border: `1px solid ${formErr.name ? "#dc2626" : "#d1d5db"}`, boxSizing: "border-box" }}
            />
            {formErr.name && <div style={{ fontSize: 11, color: "#b91c1c", marginTop: 3 }}>{formErr.name}</div>}
          </div>

          {/* Planta */}
          <div style={{ marginBottom: 22 }}>
            <label style={{ fontSize: 12, fontWeight: 600, color: "#374151", display: "block", marginBottom: 5 }}>Planta</label>
            <select
              value={formPlant}
              onChange={e => { setFormPlant(e.target.value); setFormErr(f => ({ ...f, plantCode: undefined })); }}
              style={{ ...S.input, width: "100%", border: `1px solid ${formErr.plantCode ? "#dc2626" : "#d1d5db"}`, boxSizing: "border-box", background: "#fff" }}
            >
              {plants.map(p => <option key={p.code} value={p.code}>{p.code} — {p.name}</option>)}
            </select>
            {formErr.plantCode && <div style={{ fontSize: 11, color: "#b91c1c", marginTop: 3 }}>{formErr.plantCode}</div>}
          </div>

          {/* Estado */}
          <div style={{ marginBottom: 22 }}>
            <label style={{ fontSize: 12, fontWeight: 600, color: "#374151", display: "block", marginBottom: 8 }}>Estado</label>
            <div style={{ display: "flex", gap: 8 }}>
              {[{ val: true, label: "Activa" }, { val: false, label: "Inactiva" }].map(opt => (
                <button key={String(opt.val)} onClick={() => setFormActive(opt.val)}
                  style={{ ...S.btn(), flex: 1, justifyContent: "center",
                    background: formActive === opt.val ? (opt.val ? "#f0fdf4" : "#fef2f2") : "#f9fafb",
                    border: `1.5px solid ${formActive === opt.val ? (opt.val ? "#16a34a" : "#dc2626") : "#e5e7eb"}`,
                    color: formActive === opt.val ? (opt.val ? "#16a34a" : "#dc2626") : "#6b7280",
                    fontWeight: formActive === opt.val ? 600 : 400 }}>
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          <div style={{ display: "flex", gap: 10, justifyContent: "flex-end", flexWrap: "wrap" }}>
            <button onClick={() => guardedExitSf(() => { setEditItem(null); setFormErr({}); })} style={S.btn()}>Cancelar</button>
            <button onClick={handleSave} style={{ ...S.btn("primary"), background: "#2563eb" }}>
              <Icon name="save" size={13} color="#fff" /> {isNew ? "Crear" : "Guardar cambios"}
            </button>
          </div>
        </div>
      </div>
    );
  }

  // List view
  return (
    <div>
      <Breadcrumb items={[
        { label: "Ajustes", onClick: () => navigate("settings") },
        { label: "Subfamilias" },
      ]} />
      <PageHeader title="Subfamilias" subtitle={`${fmtN(subfamilies.length)} subfamilias en el sistema`} />

      {/* Toolbar */}
      <div style={{ display: "flex", gap: 10, marginBottom: 16, flexWrap: "wrap" }}>
        <input
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Buscar por código o nombre..."
          style={{ ...S.input, flex: "1 1 200px", minWidth: 180 }}
        />
        <select
          value={plantFilter}
          onChange={e => setPlantFilter(e.target.value)}
          style={{ ...S.input, flex: "0 0 auto" }}
        >
          <option value="all">Todas las plantas</option>
          {plants.map(p => <option key={p.code} value={p.code}>{p.code} — {p.name}</option>)}
        </select>
        <button onClick={() => setEditItem({})} style={{ ...S.btn("primary"), background: "#2563eb", flexShrink: 0 }}>
          <Icon name="plus" size={14} color="#fff" /> Nueva
        </button>
      </div>

      {/* Count */}
      <div style={{ fontSize: 12, color: "#6b7280", marginBottom: 10 }}>
        {filtered.length} resultado{filtered.length !== 1 ? "s" : ""}{search || plantFilter !== "all" ? ` · filtrado de ${subfamilies.length}` : ""}
      </div>

      {/* Table — desktop / cards — mobile */}
      {filtered.length === 0 ? (
        <EmptyState icon="list" title="Sin resultados" sub="Prueba con otro término de búsqueda o filtro." />
      ) : wide ? (
        <div style={{ ...S.card, padding: 0, overflow: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 500 }}>
            <thead>
              <tr>
                <th style={S.th}>Código</th>
                <th style={S.th}>Nombre</th>
                <th style={S.th}>Planta</th>
                <th style={{ ...S.th, width: 100 }}></th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(sf => {
                const plantMeta = plantsMeta[sf.plantCode] || {};
                return (
                  <tr key={sf.code} style={{ borderBottom: "1px solid #f3f4f6" }}>
                    <td style={{ ...S.td, fontFamily: "monospace", fontSize: 12, fontWeight: 600, color: "#374151" }}>{sf.code}</td>
                    <td style={{ ...S.td, maxWidth: 300 }}>{sf.name}</td>
                    <td style={S.td}>
                      <span style={{ ...S.badge(plantMeta.color || "#6b7280", `${plantMeta.color || "#6b7280"}18`) }}>{sf.plantCode}</span>
                    </td>
                    <td style={{ ...S.td, textAlign: "right" }}>
                      <div style={{ display: "flex", gap: 6, justifyContent: "flex-end" }}>
                        <button onClick={() => setEditItem(sf)} style={{ ...S.btn(), padding: "4px 10px", fontSize: 12 }}>
                          <Icon name="edit" size={12} color="#6b7280" /> Editar
                        </button>
                        <button onClick={() => setDeleteId(sf.code)} style={{ ...S.btn(), padding: "4px 10px", fontSize: 12, color: "#b91c1c", border: "1px solid #fecaca" }}>
                          <Icon name="trash" size={12} color="#dc2626" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {filtered.map(sf => {
            const plantMeta = plantsMeta[sf.plantCode] || {};
            return (
              <div key={sf.code} style={{ ...S.card, display: "flex", alignItems: "center", gap: 12, padding: "12px 14px" }}>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 3 }}>
                    <span style={{ fontFamily: "monospace", fontSize: 12, fontWeight: 700, color: "#374151" }}>{sf.code}</span>
                    <span style={{ ...S.badge(plantMeta.color || "#6b7280", `${plantMeta.color || "#6b7280"}18`) }}>{sf.plantCode}</span>
                  </div>
                  <div style={{ fontSize: 13, color: "#111827", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{sf.name}</div>
                </div>
                <div style={{ display: "flex", gap: 6, flexShrink: 0 }}>
                  <button onClick={() => setEditItem(sf)} style={{ ...S.btn(), padding: "6px 10px" }}>
                    <Icon name="edit" size={14} color="#6b7280" />
                  </button>
                  <button onClick={() => setDeleteId(sf.code)} style={{ ...S.btn(), padding: "6px 10px", border: "1px solid #fecaca" }}>
                    <Icon name="trash" size={14} color="#dc2626" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {deleteId && (
        <ConfirmDialog
          title="Eliminar subfamilia"
          message={`¿Eliminar "${subfamilies.find(s => s.code === deleteId)?.name}" (${deleteId})?\nEsta acción no se puede deshacer.`}
          confirmLabel="Eliminar"
          danger
          onConfirm={() => handleDelete(deleteId)}
          onCancel={() => setDeleteId(null)}
        />
      )}
    </div>
  );
}

// ─── Users CRUD ───────────────────────────────────────────────────────────────
function UsersCrudPage({ users, setUsers, navigate, showToast, wide }) {
  const [search, setSearch] = useState("");
  const [editId, setEditId] = useState(null);   // null=list, "new"=create, "uX"=edit
  const [deleteId, setDeleteId] = useState(null);
  const [formErr, setFormErr] = useState({});
  const [formNombre, setFormNombre] = useState("");
  const [formApellido, setFormApellido] = useState("");
  const [leaveConfirm, setLeaveConfirm] = useState(null);

  const filtered = users.filter(u => {
    const q = search.toLowerCase();
    return !q || u.nombre.toLowerCase().includes(q) || u.apellido.toLowerCase().includes(q);
  }).sort((a, b) => a.apellido.localeCompare(b.apellido));

  const origRef = React.useRef(null);
  const prevEdit = React.useRef(undefined);
  if (editId !== prevEdit.current) {
    prevEdit.current = editId;
    if (editId !== null) {
      if (editId === "new") {
        setFormNombre(""); setFormApellido("");
        origRef.current = { nombre: "", apellido: "" };
      } else {
        const u = users.find(x => x.id === editId) || {};
        setFormNombre(u.nombre || ""); setFormApellido(u.apellido || "");
        origRef.current = { nombre: u.nombre || "", apellido: u.apellido || "" };
      }
      setFormErr({});
    }
  }

  function isDirtyUser() {
    const o = origRef.current;
    if (!o) return false;
    return formNombre !== o.nombre || formApellido !== o.apellido;
  }
  function guardedExitUser(fn) { if (isDirtyUser()) { setLeaveConfirm(() => fn); } else { fn(); } }

  function validate() {
    const err = {};
    if (!formNombre.trim()) err.nombre = "Requerido";
    if (!formApellido.trim()) err.apellido = "Requerido";
    return err;
  }

  function handleSave() {
    const err = validate();
    if (Object.keys(err).length) { setFormErr(err); return; }
    const nombre = formNombre.trim(), apellido = formApellido.trim();
    if (editId === "new") {
      setUsers(prev => [...prev, { id: `u${Date.now()}`, nombre, apellido }]);
      showToast("Usuario creado");
    } else {
      setUsers(prev => prev.map(u => u.id === editId ? { ...u, nombre, apellido } : u));
      showToast("Usuario actualizado");
    }
    setEditId(null); setFormErr({});
  }

  function handleDelete(id) {
    setUsers(prev => prev.filter(u => u.id !== id));
    setDeleteId(null); showToast("Usuario eliminado");
  }

  // Form view
  if (editId !== null) {
    const isNew = editId === "new";
    const preview = formNombre.trim() && formApellido.trim() ? `${formNombre.trim()} ${formApellido.trim()}` : null;
    return (
      <div style={{ width: "100%", maxWidth: "min(100%, 1040px)" }}>
        {leaveConfirm && <ConfirmDialog title="Cambios sin guardar" message="Tienes cambios sin guardar. Si sales, se perderán los datos. ¿Deseas salir?" confirmLabel="Salir sin guardar" cancelLabel="Cancelar" danger onConfirm={() => { setLeaveConfirm(null); leaveConfirm(); }} onCancel={() => setLeaveConfirm(null)} />}
        <Breadcrumb items={[
          { label: "Ajustes", onClick: () => guardedExitUser(() => { setEditId(null); navigate("settings"); }) },
          { label: "Usuarios", onClick: () => guardedExitUser(() => setEditId(null)) },
          { label: isNew ? "Nuevo usuario" : "Editar usuario" },
        ]} />
        <div style={S.card}>
          <div style={{ fontWeight: 700, fontSize: 15, color: "#111827", marginBottom: 18 }}>
            {isNew ? "Nuevo usuario" : "Editar usuario"}
          </div>

          <div style={{ marginBottom: 14 }}>
            <label style={{ fontSize: 12, fontWeight: 600, color: "#374151", display: "block", marginBottom: 5 }}>Nombre</label>
            <input value={formNombre} onChange={e => { setFormNombre(e.target.value); setFormErr(f => ({ ...f, nombre: undefined })); }}
              placeholder="Escriba"
              style={{ ...S.input, width: "100%", border: `1px solid ${formErr.nombre ? "#dc2626" : "#d1d5db"}`, boxSizing: "border-box" }} />
            {formErr.nombre && <div style={{ fontSize: 11, color: "#b91c1c", marginTop: 3 }}>{formErr.nombre}</div>}
          </div>

          <div style={{ marginBottom: 14 }}>
            <label style={{ fontSize: 12, fontWeight: 600, color: "#374151", display: "block", marginBottom: 5 }}>Apellido</label>
            <input value={formApellido} onChange={e => { setFormApellido(e.target.value); setFormErr(f => ({ ...f, apellido: undefined })); }}
              placeholder="Escriba"
              style={{ ...S.input, width: "100%", border: `1px solid ${formErr.apellido ? "#dc2626" : "#d1d5db"}`, boxSizing: "border-box" }} />
            {formErr.apellido && <div style={{ fontSize: 11, color: "#b91c1c", marginTop: 3 }}>{formErr.apellido}</div>}
          </div>

          {preview && (
            <div style={{ background: "#f0fdf4", border: "1px solid #bbf7d0", borderRadius: 8, padding: "8px 12px", marginBottom: 20, fontSize: 13, color: "#166534" }}>
              Vista en sistema: <strong>{preview}</strong>
            </div>
          )}

          <div style={{ display: "flex", gap: 10, justifyContent: "flex-end", flexWrap: "wrap" }}>
            <button onClick={() => guardedExitUser(() => { setEditId(null); setFormErr({}); })} style={S.btn()}>Cancelar</button>
            <button onClick={handleSave} style={{ ...S.btn("primary"), background: "#2563eb" }}>
              <Icon name="save" size={13} color="#fff" /> {isNew ? "Crear" : "Guardar cambios"}
            </button>
          </div>
        </div>
      </div>
    );
  }

  // List view
  return (
    <div>
      <Breadcrumb items={[
        { label: "Ajustes", onClick: () => navigate("settings") },
        { label: "Usuarios" },
      ]} />
      <PageHeader title="Usuarios" subtitle={`${fmtN(users.length)} usuario${users.length !== 1 ? "s" : ""} registrados`} />

      <div style={{ display: "flex", gap: 10, marginBottom: 16, flexWrap: "wrap" }}>
        <input value={search} onChange={e => setSearch(e.target.value)}
          placeholder="Buscar por nombre o apellido…"
          style={{ ...S.input, flex: "1 1 200px" }} />
        <button onClick={() => setEditId("new")} style={{ ...S.btn("primary"), background: "#2563eb", flexShrink: 0 }}>
          <Icon name="plus" size={14} color="#fff" /> Nuevo
        </button>
      </div>

      <div style={{ fontSize: 12, color: "#6b7280", marginBottom: 10 }}>
        {filtered.length} resultado{filtered.length !== 1 ? "s" : ""}{search ? ` · filtrado de ${users.length}` : ""}
      </div>

      {filtered.length === 0 ? (
        <EmptyState icon="verify" title="Sin usuarios" sub="Crea el primer usuario con el botón Nueva." />
      ) : wide ? (
        <div style={{ ...S.card, padding: 0, overflow: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 400 }}>
            <thead>
              <tr>
                <th style={S.th}>Nombre completo</th>
                <th style={S.th}>Apellido</th>
                <th style={S.th}>Vista en sistema</th>
                <th style={{ ...S.th, width: 110 }}></th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(u => (
                <tr key={u.id} style={{ borderBottom: "1px solid #f3f4f6" }}>
                  <td style={S.td}>{u.nombre} {u.apellido}</td>
                  <td style={S.td}>{u.apellido}</td>
                  <td style={{ ...S.td, fontWeight: 600, color: "#2563eb" }}>{u.nombre} {u.apellido}</td>
                  <td style={{ ...S.td, textAlign: "right" }}>
                    <div style={{ display: "flex", gap: 6, justifyContent: "flex-end" }}>
                      <button onClick={() => setEditId(u.id)} style={{ ...S.btn(), padding: "4px 10px", fontSize: 12 }}>
                        <Icon name="edit" size={12} color="#6b7280" /> Editar
                      </button>
                      <button onClick={() => setDeleteId(u.id)} style={{ ...S.btn(), padding: "4px 10px", fontSize: 12, color: "#b91c1c", border: "1px solid #fecaca" }}>
                        <Icon name="trash" size={12} color="#dc2626" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {filtered.map(u => (
            <div key={u.id} style={{ ...S.card, display: "flex", alignItems: "center", gap: 12, padding: "12px 14px" }}>
              <div style={{ width: 36, height: 36, borderRadius: "50%", background: "#eff6ff", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <span style={{ fontSize: 14, fontWeight: 700, color: "#2563eb" }}>{u.nombre[0]}{u.apellido[0]}</span>
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: "#111827" }}>{u.nombre} {u.apellido}</div>
                <div style={{ fontSize: 12, color: "#2563eb" }}>{u.nombre} {u.apellido}</div>
              </div>
              <div style={{ display: "flex", gap: 6, flexShrink: 0 }}>
                <button onClick={() => setEditId(u.id)} style={{ ...S.btn(), padding: "6px 10px" }}>
                  <Icon name="edit" size={14} color="#6b7280" />
                </button>
                <button onClick={() => setDeleteId(u.id)} style={{ ...S.btn(), padding: "6px 10px", border: "1px solid #fecaca" }}>
                  <Icon name="trash" size={14} color="#dc2626" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {deleteId && (
        <ConfirmDialog
          title="Eliminar usuario"
          message={`¿Eliminar a "${users.find(u => u.id === deleteId)?.nombre} ${users.find(u => u.id === deleteId)?.apellido}"?\nEsta acción no se puede deshacer.`}
          confirmLabel="Eliminar"
          danger
          onConfirm={() => handleDelete(deleteId)}
          onCancel={() => setDeleteId(null)}
        />
      )}
    </div>
  );
}

// ─── Settings ─────────────────────────────────────────────────────────────────
// ─── Roles CRUD ──────────────────────────────────────────────────────────────
function RolesCrudPage({ users, setUsers, navigate, wide }) {
  return (
    <div>
      <Breadcrumb items={[
        { label: "Ajustes", onClick: () => navigate("settings") },
        { label: "Roles" },
      ]} />
      <PageHeader title="Roles" subtitle="Asigna un rol a cada usuario del sistema" />
      {users.length === 0
        ? <EmptyState icon="verify" title="Sin usuarios" sub="Agrega usuarios en la sección Usuarios." />
        : wide
          ? (
            <div style={S.card}>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr>
                    <th style={S.th}>Usuario</th>
                    <th style={S.th}>Rol</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map(u => (
                    <tr key={u.id} style={{ borderBottom: "1px solid #f3f4f6" }}>
                      <td style={{ ...S.td, fontWeight: 500 }}>{u.nombre} {u.apellido}</td>
                      <td style={S.td}>
                        <select value={u.role || "Auditor"} onChange={e => setUsers(prev => prev.map(x => x.id === u.id ? { ...x, role: e.target.value } : x))}
                          style={{ ...S.input, padding: "5px 10px", fontSize: 13, width: "auto", minWidth: 160 }}>
                          {ROLES.map(r => <option key={r} value={r}>{r}</option>)}
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )
          : (
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {users.map(u => (
                <div key={u.id} style={{ ...S.card, display: "flex", flexDirection: "column", gap: 8 }}>
                  <div style={{ fontWeight: 600, fontSize: 14, color: "#111827" }}>{u.nombre} {u.apellido}</div>
                  <select value={u.role || "Auditor"} onChange={e => setUsers(prev => prev.map(x => x.id === u.id ? { ...x, role: e.target.value } : x))}
                    style={{ ...S.input, fontSize: 13, width: "100%" }}>
                    {ROLES.map(r => <option key={r} value={r}>{r}</option>)}
                  </select>
                </div>
              ))}
            </div>
          )
      }
    </div>
  );
}

function SettingsPage({ lastSaved, setLastSaved, showToast, navigate, subfamilies, plantsMeta, users, inv, history, audits, setInv, setHistory, setAudits, setSubfamilies, setPlantsMeta, setUsers }) {
  const [importPending, setImportPending] = useState(null);
  const [confirmClear, setConfirmClear] = useState(false);
  const fileInputRef = useRef(null);

  function pad2(n) { return String(n).padStart(2, "0"); }

  function handleExportBackup() {
    const now = new Date();
    const filename = `PFStock_Backup_${now.getFullYear()}-${pad2(now.getMonth() + 1)}-${pad2(now.getDate())}_${pad2(now.getHours())}-${pad2(now.getMinutes())}.json`;
    const payload = { schemaVersion: PF_SCHEMA_VERSION, exportedAt: now.toISOString(), inv, history, audits, subfamilies, plantsMeta, users };
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    showToast("Respaldo exportado");
  }

  function handleFileSelected(e) {
    const file = e.target.files && e.target.files[0];
    if (fileInputRef.current) fileInputRef.current.value = "";
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      let parsed;
      try {
        parsed = JSON.parse(reader.result);
      } catch (err) {
        showToast("El archivo no es un respaldo válido (JSON inválido)", "error");
        return;
      }
      if (!pfValidateBackup(parsed)) {
        showToast("El archivo no tiene la estructura esperada de un respaldo de PF Stock", "error");
        return;
      }
      setImportPending(parsed);
    };
    reader.onerror = () => showToast("No se pudo leer el archivo", "error");
    reader.readAsText(file);
  }

  function applyImport() {
    const data = importPending;
    if (!data) return;
    setInv(data.inv || {});
    setHistory(data.history || []);
    setAudits(data.audits || []);
    setSubfamilies(data.subfamilies || SUBFAMILIES_DATA);
    setPlantsMeta(data.plantsMeta || PLANTS_META_DATA);
    setUsers(data.users || []);
    setImportPending(null);
    showToast("Respaldo restaurado");
  }

  function handleClearLocalData() {
    clearState()
      .catch((err) => console.warn("[PF Stock] clearState failed:", err))
      .finally(() => {
        setInv(INITIAL_INV);
        setHistory([]);
        setAudits([]);
        setSubfamilies(SUBFAMILIES_DATA);
        setPlantsMeta(PLANTS_META_DATA);
        setUsers([]);
        setConfirmClear(false);
        showToast("Datos locales eliminados");
      });
  }

  return (
    <div style={{ maxWidth: "100%" }}>
      {importPending && (
        <ConfirmDialog
          title="Restaurar respaldo"
          message="Esto reemplazará todos los datos actuales (inventario, auditorías, historial, subfamilias, plantas y usuarios) con el contenido del respaldo seleccionado. Esta acción no se puede deshacer."
          confirmLabel="Reemplazar datos"
          cancelLabel="Cancelar"
          danger
          onConfirm={applyImport}
          onCancel={() => setImportPending(null)}
        />
      )}
      {confirmClear && (
        <ConfirmDialog
          title="Eliminar datos locales"
          message="Esto eliminará todos los datos guardados en este dispositivo (inventario, auditorías, historial, subfamilias, plantas y usuarios) y no se puede deshacer. Exporta un respaldo antes si lo necesitas."
          confirmLabel="Eliminar todo"
          cancelLabel="Cancelar"
          danger
          onConfirm={handleClearLocalData}
          onCancel={() => setConfirmClear(false)}
        />
      )}
      <PageHeader title="Ajustes" subtitle="Gestión del sistema" />
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>

        {/* Plantas management */}
        <button onClick={() => navigate("settings-plantas")} style={{ ...S.card, width: "100%", textAlign: "left", cursor: "pointer", border: "1px solid #e5e7eb", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ width: 36, height: 36, background: "#f0fdf4", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <Icon name="plant" size={18} color="#16a34a" />
            </div>
            <div>
              <div style={{ fontWeight: 600, fontSize: 14, color: "#111827" }}>Plantas</div>
              <div style={{ fontSize: 12, color: "#6b7280", marginTop: 1 }}>{fmtN(Object.keys(plantsMeta).length)} plantas · Crear, editar y eliminar</div>
            </div>
          </div>
          <Icon name="chevronRight" size={16} color="#9ca3af" />
        </button>

        {/* Subfamilias management */}
        <button onClick={() => navigate("settings-subfamilies")} style={{ ...S.card, width: "100%", textAlign: "left", cursor: "pointer", border: "1px solid #e5e7eb", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ width: 36, height: 36, background: "#eff6ff", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <Icon name="list" size={18} color="#2563eb" />
            </div>
            <div>
              <div style={{ fontWeight: 600, fontSize: 14, color: "#111827" }}>Subfamilias</div>
              <div style={{ fontSize: 12, color: "#6b7280", marginTop: 1 }}>{fmtN(subfamilies.length)} subfamilias · Crear, editar y eliminar</div>
            </div>
          </div>
          <Icon name="chevronRight" size={16} color="#9ca3af" />
        </button>

        {/* Usuarios management */}
        <button onClick={() => navigate("settings-usuarios")} style={{ ...S.card, width: "100%", textAlign: "left", cursor: "pointer", border: "1px solid #e5e7eb", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ width: 36, height: 36, background: "#f5f3ff", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <Icon name="users" size={18} color="#7c3aed" />
            </div>
            <div>
              <div style={{ fontWeight: 600, fontSize: 14, color: "#111827" }}>Usuarios</div>
              <div style={{ fontSize: 12, color: "#6b7280", marginTop: 1 }}>{fmtN(users.length)} usuario{users.length !== 1 ? "s" : ""} · Crear, editar y eliminar</div>
            </div>
          </div>
          <Icon name="chevronRight" size={16} color="#9ca3af" />
        </button>

        <button onClick={() => navigate("settings-roles")} style={{ ...S.card, width: "100%", textAlign: "left", cursor: "pointer", border: "1px solid #e5e7eb", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ width: 36, height: 36, background: "#fff7ed", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <Icon name="shieldCheck" size={18} color="#9a3412" />
            </div>
            <div>
              <div style={{ fontWeight: 600, fontSize: 14, color: "#111827" }}>Roles</div>
              <div style={{ fontSize: 12, color: "#6b7280", marginTop: 1 }}>Asignar rol a cada usuario</div>
            </div>
          </div>
          <Icon name="chevronRight" size={16} color="#9ca3af" />
        </button>

        <div style={S.card}>
          <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 8 }}>Respaldo y datos</div>
          <p style={{ fontSize: 13, color: "#6b7280", marginBottom: 12 }}>
            Los datos se almacenan localmente en este dispositivo. Si se borran los datos de Safari, se elimina la app o el dispositivo se restablece, la información podría perderse. Exporta respaldos periódicamente.
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <button onClick={handleExportBackup} style={{ ...S.btn("primary"), width: "100%", justifyContent: "center" }}>
              <Icon name="file" size={14} color="#fff" /> Exportar respaldo
            </button>
            <input ref={fileInputRef} type="file" accept="application/json,.json" onChange={handleFileSelected} style={{ display: "none" }} />
            <button onClick={() => fileInputRef.current && fileInputRef.current.click()} style={{ ...S.btn(), width: "100%", justifyContent: "center" }}>
              <Icon name="upload" size={14} color="#374151" /> Importar respaldo
            </button>
            <button onClick={() => setConfirmClear(true)} style={{ ...S.btn("danger"), width: "100%", justifyContent: "center" }}>
              <Icon name="trash" size={14} color="#dc2626" /> Borrar datos locales
            </button>
          </div>
        </div>

        <div style={S.card}>
          <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 8 }}>Guardado</div>
          <p style={{ fontSize: 13, color: "#6b7280", marginBottom: 12 }}>Los cambios se guardan automáticamente en este dispositivo. La hora mostrada abajo es una referencia visual del último guardado.</p>
          <button onClick={() => { setLastSaved(new Date()); showToast("Datos guardados"); }} style={{ ...S.btn("primary"), width: "100%", justifyContent: "center" }}>
            <Icon name="save" size={14} color="#fff" /> Guardar ahora
          </button>
        </div>

        <div style={S.card}>
          <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 8 }}>Acerca de</div>
          {[["Versión", (typeof window !== "undefined" && window.APP_VERSION) || "1.0.0"], ["Plantas", Object.keys(plantsMeta).length], ["Subfamilias", fmtN(subfamilies.length)], ["Desarrollado por", "María Andrea Vergara"]].map(([l, v]) => (
            <div key={l} style={{ display: "flex", justifyContent: "space-between", padding: "6px 0", fontSize: 13 }}>
              <span style={{ color: "#6b7280" }}>{l}</span><span style={{ fontWeight: 500 }}>{v}</span>
            </div>
          ))}
          <p style={{ fontSize: 12, color: "#6b7280", marginTop: 8 }}>Sistema PWA de inventario de repuestos industriales. Preparado para empaquetado como APK con Capacitor.</p>
        </div>
      </div>
    </div>
  );
}


// ─── Shared: Parts Table ──────────────────────────────────────────────────────
function PartsTable({ parts, onVerify, onPhysQty, showPlant, plantsMeta }) {
  return (
    <div style={{ ...S.card, padding: 0, overflow: "auto" }}>
      <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 700 }}>
        <thead>
          <tr>
            <th style={S.th}>Verificado</th>
            {showPlant && <th style={S.th}>Planta</th>}
            <th style={S.th}>Código</th>
            <th style={S.th}>Nombre</th>
            <th style={S.th}>Cant. sistema</th>
            <th style={S.th}>Cant. física</th>
            <th style={S.th}>Diferencia</th>
            <th style={S.th}>Valor unit.</th>
            <th style={S.th}>Valor total</th>
          </tr>
        </thead>
        <tbody>
          {parts.map(p => {
            const diff = partDiff(p);
            const hasDiff = p.physicalQty !== null && diff !== 0;
            return (
              <tr key={p.id} style={{ background: hasDiff ? "#fef9f9" : p.verified ? "#f9fefb" : "transparent" }}>
                <td style={S.td}>
                  <input type="checkbox" checked={p.verified} onChange={e => onVerify(p.id, e.target.checked)} style={{ width: 16, height: 16, cursor: "pointer" }} />
                </td>
                {showPlant && <td style={S.td}><span style={{ ...S.badge(plantsMeta[p.plantCode]?.color || "#374151", plantsMeta[p.plantCode]?.bg || "#f3f4f6"), fontSize: 10 }}>{p.plantCode}</span></td>}
                <td style={S.td}><span style={{ fontFamily: "monospace", fontSize: 11 }}>{p.code}</span></td>
                <td style={{ ...S.td, maxWidth: 200, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{p.name}</td>
                <td style={S.td}>{fmtN(p.systemQty)} {p.unit}</td>
                <td style={S.td}>
                  <input type="number" defaultValue={p.physicalQty ?? p.systemQty} min={0}
                    style={{ ...S.input, width: 80, padding: "4px 6px", background: p.physicalQty !== null ? "#fff" : "#f9fafb" }}
                    onFocus={e => { if (p.physicalQty === null) e.target.value = ""; }}
                    onBlur={e => onPhysQty(p.id, e.target.value)}
                    onKeyDown={e => { if (e.key === "Enter") { onPhysQty(p.id, e.target.value); e.target.blur(); } }}
                    placeholder={String(p.systemQty)}
                  />
                </td>
                <td style={S.td}>
                  {hasDiff
                    ? <span style={{ color: diff < 0 ? "#b91c1c" : "#166534", fontWeight: 600 }}>{diff > 0 ? "+" : ""}{fmtN(diff)}</span>
                    : p.physicalQty !== null ? <span style={{ color: "#166534" }}>✓</span> : <span style={{ color: "#6b7280" }}>—</span>
                  }
                </td>
                <td style={S.td}>{fmtCLP(p.unitValue)}</td>
                <td style={{ ...S.td, fontWeight: 600 }}>{fmtCLP(partVal(p))}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

// ─── Shared: Part Card (mobile) ───────────────────────────────────────────────
function PartCard({ part: p, onVerify, onPhysQty, showPlant, plantsMeta }) {
  const diff = partDiff(p);
  const hasDiff = p.physicalQty !== null && diff !== 0;
  return (
    <div style={{ ...S.card, padding: "12px 14px",
      background: hasDiff ? "#fff5f5" : p.verified ? "#f0fdf4" : "#fff",
      border: `1.5px solid ${hasDiff ? "#f87171" : p.verified ? "#4ade80" : "#e5e7eb"}`,
      borderLeft: `4px solid ${hasDiff ? "#b91c1c" : p.verified ? "#166534" : "#e5e7eb"}`,
    }}>
      <div style={{ display: "flex", alignItems: "flex-start", gap: 10, marginBottom: 8 }}>
        <label style={{ display: "flex", alignItems: "center", cursor: "pointer", flexShrink: 0, paddingTop: 2 }}>
          <input type="checkbox" checked={p.verified} onChange={e => onVerify(p.id, e.target.checked)} style={{ width: 18, height: 18 }} />
        </label>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 3 }}>
            <span style={{ fontFamily: "monospace", fontSize: 11, color: "#6b7280" }}>{p.code}</span>
            {showPlant && <span style={{ ...S.badge(plantsMeta[p.plantCode]?.color || "#374151", plantsMeta[p.plantCode]?.bg || "#f3f4f6"), fontSize: 9 }}>{p.plantCode}</span>}
          </div>
          <div style={{ fontSize: 13, fontWeight: 500, color: "#111827", lineHeight: 1.3 }}>{p.name}</div>
        </div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 10 }}>
        <div>
          <div style={{ fontSize: 10, color: "#6b7280", marginBottom: 2 }}>Cant. sistema</div>
          <div style={{ fontSize: 13, fontWeight: 500 }}>{fmtN(p.systemQty)} {p.unit}</div>
        </div>
        <div>
          <div style={{ fontSize: 10, color: "#6b7280", marginBottom: 2 }}>Cant. física</div>
          <input type="number" defaultValue={p.physicalQty ?? p.systemQty} min={0}
            style={{ ...S.input, width: "100%", padding: "5px 8px", fontSize: 13,
              background: hasDiff ? "#fef2f2" : p.physicalQty !== null ? "#f0fdf4" : "#f9fafb",
              borderColor: hasDiff ? "#fca5a5" : p.physicalQty !== null ? "#86efac" : "#e5e7eb",
            }}
            onFocus={e => { if (p.physicalQty === null) e.target.value = ""; }}
            onBlur={e => onPhysQty(p.id, e.target.value)}
            onKeyDown={e => { if (e.key === "Enter") { onPhysQty(p.id, e.target.value); e.target.blur(); } }}
            placeholder={String(p.systemQty)}
          />
        </div>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ fontSize: 12, color: "#6b7280" }}>Valor: <strong>{fmtCLP(partVal(p))}</strong></div>
        {hasDiff
          ? <span style={{ fontSize: 12, fontWeight: 700, color: diff < 0 ? "#b91c1c" : "#166534" }}>Dif: {diff > 0 ? "+" : ""}{fmtN(diff)} {p.unit}</span>
          : p.physicalQty !== null ? <span style={{ fontSize: 12, color: "#166534", fontWeight: 600 }}>✓ Sin diferencias</span> : null
        }
      </div>
    </div>
  );
}

// ─── Micro-components ─────────────────────────────────────────────────────────
// ─── Shared ConfirmDialog ─────────────────────────────────────────────────────
function ConfirmDialog({ title, message, confirmLabel = "Confirmar", cancelLabel = "Cancelar", danger = false, onConfirm, onCancel, accentColor }) {
  useEffect(() => {
    const onKey = e => { if (e.key === "Escape") onCancel(); };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onCancel]);
  return (
    <div role="dialog" aria-modal="true" aria-label={title}
      style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.45)", zIndex: 200, display: "flex", alignItems: "center", justifyContent: "center", padding: 16 }}>
      <div style={{ background: "#fff", borderRadius: 14, padding: "24px 20px", width: "100%", maxWidth: 360, boxShadow: "0 8px 32px rgba(0,0,0,0.18)" }}>
        <div style={{ fontWeight: 700, fontSize: 16, color: "#111827", marginBottom: 6 }}>{title}</div>
        {message && <div style={{ fontSize: 13, color: "#6b7280", marginBottom: 20, lineHeight: 1.5, whiteSpace: "pre-wrap" }}>{message}</div>}
        <div style={{ display: "flex", gap: 8 }}>
          <button autoFocus onClick={onCancel} style={{ ...S.btn(), flex: 1, justifyContent: "center" }}>{cancelLabel}</button>
          {onConfirm && <button onClick={onConfirm} style={{
            ...S.btn(danger ? "danger" : "primary"), flex: 1, justifyContent: "center",
            background: danger ? "#dc2626" : (accentColor || "#2563eb"),
            color: "#fff", border: "none",
          }}>{confirmLabel}</button>}
        </div>
      </div>
    </div>
  );
}

function KpiCard({ label, value, sub, icon, color, highlight }) {
  return (
    <div style={{ background: highlight ? "#fef2f2" : "#fff", border: `1px solid ${highlight ? "#fecaca" : "#e5e7eb"}`, borderRadius: 12, padding: "14px 16px" }}>
      <div style={{ fontSize: 12, color: "#6b7280", marginBottom: 4 }}>{label}</div>
      <div style={{ fontSize: 22, fontWeight: 700, color: highlight ? "#dc2626" : "#111827", lineHeight: 1.2 }}>{value}</div>
      {sub && <div style={{ fontSize: 12, color: color || "#6b7280", marginTop: 4 }}>{sub} completado</div>}
    </div>
  );
}

function PageHeader({ title, subtitle }) {
  return (
    <div style={{ marginBottom: 20 }}>
      <h1 style={{ fontSize: 20, fontWeight: 700, color: "#111827", margin: "0 0 4px" }}>{title}</h1>
      {subtitle && <p style={{ fontSize: 13, color: "#6b7280", margin: 0 }}>{subtitle}</p>}
    </div>
  );
}

function Breadcrumb({ items }) {
  const back = items.length >= 2 ? items[items.length - 2] : null;
  return (
    <div style={{ marginBottom: 16 }}>
      {back?.onClick && (
        <button onClick={back.onClick} style={{ display: "inline-flex", alignItems: "center", gap: 8, minHeight: 44, padding: "0 16px 0 10px", marginBottom: 8, background: "#f1f5f9", border: "1.5px solid #cbd5e1", borderRadius: 10, cursor: "pointer", fontSize: 14, fontWeight: 600, color: "#1e40af", transition: "background 0.15s" }}
          onMouseEnter={e => e.currentTarget.style.background="#dbeafe"}
          onMouseLeave={e => e.currentTarget.style.background="#f1f5f9"}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
          {back.label}
        </button>
      )}
      <div style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 12, color: "#6b7280" }}>
        {items.map((item, i) => (
          <span key={i} style={{ display: "flex", alignItems: "center", gap: 4 }}>
            {i > 0 && <Icon name="chevronRight" size={11} color="#d1d5db" />}
            {item.onClick
              ? <button onClick={item.onClick} style={{ background: "none", border: "none", cursor: "pointer", color: "#6b7280", fontSize: 12, padding: 0 }}>{item.label}</button>
              : <span style={{ color: "#374151", fontWeight: 500 }}>{item.label}</span>
            }
          </span>
        ))}
      </div>
    </div>
  );
}

function EmptyState({ icon, title, sub }) {
  return (
    <div style={{ textAlign: "center", padding: "60px 20px", color: "#6b7280", display: "flex", flexDirection: "column", alignItems: "center" }}>
      <Icon name={icon} size={40} color="#d1d5db" />
      <div style={{ fontWeight: 600, fontSize: 15, marginTop: 12, color: "#374151" }}>{title}</div>
      <div style={{ fontSize: 13, marginTop: 4 }}>{sub}</div>
    </div>
  );
}
