import HeroInicio from './home/HeroInicio';
import LlamadoAdopcion from './home/LlamadoAdopcion';
import NuestrasActividades from './home/NuestrasActividades';
import MascotasDestacadas from './home/MascotasDestacadas';
import Estadisticas from './home/Estadisticas';
import ComoAyudar from './home/ComoAyudar';

export default function Home() {
  return (
    <>
      <HeroInicio />
      <LlamadoAdopcion />
      <NuestrasActividades />
      <Estadisticas />
      <ComoAyudar />
    </>
  );
}
