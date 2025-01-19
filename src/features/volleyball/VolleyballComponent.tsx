import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "reduxTools/hooks";
import { VolleyballPosition } from "types/volleyballTool.New.Types";
import { useMoveable } from "utils/hooks/useMoveable.hook";
import { v4 as uuidv4 } from "uuid";
import { updateVolleyballPosition } from "./volleyballPosition.Slice";

// TODO: continue working on this
/**
 * VolleyballComponent renders a draggable circle representing a volleyball.
 *
 * @param props - Component props
 * @returns React component
 */
const VolleyballComponent = (props: { svgRef: React.RefObject<SVGSVGElement> }) => {
  const { svgRef } = props;
  const dispatch = useAppDispatch();
  // volleyball circle radius
  const volleyballCircleRadius = 30;

  const volleyballPosition = useAppSelector((selector) => selector.volleyballPosition);
  const [position, setPosition] = useState<VolleyballPosition>(volleyballPosition);
  // useMoveable hook
  const [isPressed, press, release, move] = useMoveable<VolleyballPosition>(position, setPosition);

  useEffect(() => {
    if (svgRef.current) {
      svgRef.current.addEventListener("mousemove", onMouseMove);
      svgRef.current.addEventListener("touchmove", onTouchMove);
    }

    return () => {
      svgRef.current?.removeEventListener("mousemove", onMouseMove);
      svgRef.current?.removeEventListener("touchmove", onTouchMove);
    };
  }, [svgRef]);

  /**
   * Handles the mouse down event on an SVG circle element.
   *
   * @param event - The mouse event triggered by pressing down on the SVG circle element.
   */
  const onMouseDown = (event: React.MouseEvent<SVGCircleElement>) => {
    event.preventDefault();
    press();
  };

  /**
   * Handles the touch start event on an SVG circle element.
   *
   * @param event - The touch event triggered on the SVG circle element.
   */
  const onTouchStart = (event: React.TouchEvent<SVGCircleElement>) => {
    event.preventDefault();
    press();
  };

  /**
   * Handles the stop pressing event.
   * Releases the current action and dispatches an action to add a new volleyball position.
   * The new position includes a unique identifier and the current x and y coordinates.
   */
  const onStopPressing = () => {
    release();
    dispatch(updateVolleyballPosition({ id: uuidv4(), x: position.x, y: position.y }));
  };

  /**
   * Handles the mouse move event.
   *
   * @param event - The mouse event containing the coordinates of the mouse pointer.
   */
  const onMouseMove = (event: MouseEvent) => {
    move(event.clientX, event.clientY, svgRef.current);
  };

  /**
   * Handles the touch move event.
   *
   * @param {TouchEvent} event - The touch event object.
   */
  const onTouchMove = (event: TouchEvent) => {
    move(event.touches[0].clientX, event.touches[0].clientY, svgRef.current);
  };

  return (
    <g
      transform={`translate(${position.x}, ${position.y})`}
      onMouseDown={onMouseDown}
      onMouseUp={onStopPressing}
      onTouchStart={onTouchStart}
      onTouchEnd={onStopPressing}
    >
      <circle cx={0} cy={0} r={volleyballCircleRadius} fill="#fff" stroke="#fff" strokeWidth={isPressed ? 8 : 2} />
      <g
        transform={`translate(${-volleyballCircleRadius}, ${-volleyballCircleRadius}) scale(${
          volleyballCircleRadius / 150
        })`}
      >
        <path
          d="M0 0 C-1.44035068 6.85052244 -3.23541981 13.54286769 -5.23242188 20.25 C-14.1342752 51.23167682 -7.21617462 87.86371283 2.72680664 117.61035156 C6.99738407 130.44037065 6.99738407 130.44037065 5.3203125 136.42578125 C4.92585938 137.04839844 4.53140625 137.67101562 4.125 138.3125 C3.65449219 139.05628906 3.18398437 139.80007812 2.69921875 140.56640625 C2.13847656 141.36949219 1.57773438 142.17257813 1 143 C0.36707031 143.91652344 -0.26585937 144.83304688 -0.91796875 145.77734375 C-5.06633356 151.52762721 -9.53994999 156.88827949 -14.3125 162.125 C-15.06768921 162.9598291 -15.06768921 162.9598291 -15.83813477 163.81152344 C-20.66389154 168.99572817 -20.66389154 168.99572817 -24 170 C-27.94064802 169.78279893 -29.70630646 167.5864928 -32.25 164.75 C-41.23733609 154.34826348 -46.96352336 142.65130031 -52 130 C-52.4640625 128.87722656 -52.928125 127.75445312 -53.40625 126.59765625 C-67.01339311 90.38108326 -62.65752743 49.51652389 -49.06030273 14.13110352 C-47.61585487 11.22790633 -46.15922394 9.54745531 -43.21337891 8.15625 C-42.55772949 7.9396875 -41.90208008 7.723125 -41.2265625 7.5 C-40.49083008 7.2539502 -39.75509766 7.00790039 -38.99707031 6.75439453 C-38.21428711 6.50544434 -37.43150391 6.25649414 -36.625 6 C-35.81643555 5.73944824 -35.00787109 5.47889648 -34.17480469 5.21044922 C-22.55885453 1.52953279 -12.26235773 -0.4963773 0 0 Z "
          fill="#043C64"
          transform="translate(138,12)"
        />
        <path
          d="M0 0 C1.21429688 0.07476562 2.42859375 0.14953125 3.6796875 0.2265625 C4.34073486 0.26257568 5.00178223 0.29858887 5.68286133 0.33569336 C7.64368863 0.46080223 9.59972252 0.65507363 11.5546875 0.8515625 C12.52535156 0.92761719 13.49601563 1.00367188 14.49609375 1.08203125 C21.3141607 1.90640634 27.75296522 4.05891652 34.2421875 6.2265625 C35.14090576 6.51861572 36.03962402 6.81066895 36.96557617 7.11157227 C37.8032251 7.40475342 38.64087402 7.69793457 39.50390625 8 C40.26018311 8.25958496 41.01645996 8.51916992 41.7956543 8.78662109 C43.5546875 9.8515625 43.5546875 9.8515625 44.35742188 11.82983398 C45.38629081 22.37446725 28.21587168 39.92923199 21.9921875 47.6640625 C17.91088797 52.53362747 13.63800397 57.22280132 9.30859375 61.87109375 C7.51189721 63.80246387 5.76121689 65.75506756 4.01953125 67.73828125 C-1.65182884 74.18260009 -7.63689258 79.63145107 -14.4453125 84.8515625 C-15.23808594 85.49480469 -16.03085938 86.13804687 -16.84765625 86.80078125 C-34.92945457 100.88344566 -62.09463157 114.28916415 -85.4453125 114.15234375 C-91.04272827 113.31054489 -94.73844076 110.24016652 -98.8828125 106.6015625 C-99.78773437 105.8118103 -99.78773437 105.8118103 -100.7109375 105.00610352 C-121.32376493 86.80184016 -121.32376493 86.80184016 -126.4453125 74.8515625 C-121.10414167 73.60971014 -115.92607525 72.76209144 -110.4453125 72.4765625 C-75.84997691 69.97082558 -44.04785894 50.51609458 -21.4453125 24.8515625 C-18.20338184 20.88993452 -15.15550311 16.79337908 -12.1640625 12.640625 C-11.71788574 12.02783691 -11.27170898 11.41504883 -10.81201172 10.78369141 C-9.84679262 9.41914265 -8.91931614 8.02751955 -8.02001953 6.61865234 C-4.30899828 1.06503586 -4.30899828 1.06503586 0 0 Z "
          fill="#053D64"
          transform="translate(156.4453125,151.1484375)"
        />
        <path
          d="M0 0 C28.52053915 -0.74733332 55.87631737 -0.05283342 83 10 C84.65902344 10.58394531 84.65902344 10.58394531 86.3515625 11.1796875 C106.7930428 18.64399892 135.59662491 33.69324983 146 54.5 C147.98754955 61.45642343 147.01754843 68.57973962 145.8125 75.625 C145.61611938 76.77863037 145.61611938 76.77863037 145.41577148 77.95556641 C141.73592922 98.19365762 141.73592922 98.19365762 135 104 C131.0422236 100.61790017 127.14900542 97.21642354 123.5 93.5 C112.39583187 82.27134568 99.68823806 72.82884372 86 65 C85.38205566 64.6405127 84.76411133 64.28102539 84.12744141 63.91064453 C67.85694044 54.52773116 50.24819268 48.30446703 32 44 C30.78376953 43.69835937 30.78376953 43.69835937 29.54296875 43.390625 C23.1005125 41.85836514 16.5488703 40.95145875 10 40 C-0.06884004 10.33059487 -0.06884004 10.33059487 0 0 Z "
          fill="#053D64"
          transform="translate(144,100)"
        />
        <path
          d="M0 0 C13.11194954 1.66500947 23.85227089 9.85227089 33 19 C34.15685595 29.79732221 28.24873168 38.84047078 22.875 47.8125 C22.30023926 48.77591309 21.72547852 49.73932617 21.13330078 50.73193359 C13.70152613 63.00953076 4.86784138 73.62149408 -5 84 C-5.63035156 84.69480469 -6.26070313 85.38960938 -6.91015625 86.10546875 C-21.11529182 101.24720667 -39.95378745 111.35693922 -59 119 C-59.69996094 119.32871094 -60.39992187 119.65742188 -61.12109375 119.99609375 C-77.10737714 127.1813265 -95.81881361 121.21156958 -111.2578125 115.5 C-120.58150223 111.81797291 -120.58150223 111.81797291 -122.375 108.3125 C-122.684375 107.1678125 -122.684375 107.1678125 -123 106 C-117.64463069 103.01255748 -112.19771012 100.66219373 -106.4152832 98.65429688 C-81.39345317 89.93345689 -60.71809528 74.51400819 -42 56 C-41.41001221 55.42757568 -40.82002441 54.85515137 -40.2121582 54.26538086 C-36.39700906 50.52776489 -32.94378999 46.66852864 -29.6875 42.4375 C-29.21948975 41.83381592 -28.75147949 41.23013184 -28.26928711 40.6081543 C-20.22915581 30.16749854 -12.87126891 19.4269228 -5.93383789 8.2199707 C-5.45035889 7.44097412 -4.96687988 6.66197754 -4.46875 5.859375 C-4.04013672 5.16295898 -3.61152344 4.46654297 -3.16992188 3.74902344 C-2 2 -2 2 0 0 Z "
          fill="#FBB714"
          transform="translate(212,168)"
        />
        <path
          d="M0 0 C54.41462042 -0.5501556 54.41462042 -0.5501556 76 6 C76.71075684 6.20608887 77.42151367 6.41217773 78.15380859 6.62451172 C100.57778747 13.18057114 127.05098525 26.23682688 138.9140625 47.5546875 C143.26902618 57.36118844 146.95078082 67.15537357 147 78 C147.01417969 79.02738281 147.02835938 80.05476563 147.04296875 81.11328125 C147.05968102 83.74379262 147.04578427 86.36994827 147 89 C142.47330924 86.68635806 138.75701968 84.04090688 134.875 80.75 C128.94522284 75.81926138 122.68343256 71.82090579 116 68 C115.37383789 67.63374512 114.74767578 67.26749023 114.10253906 66.89013672 C96.62980794 56.74174578 77.89608916 51.11845211 58 48 C57.0836377 47.85578613 56.16727539 47.71157227 55.22314453 47.56298828 C36.87715892 44.79348901 18.51650882 44.31081221 0 44 C-0.9380572 40.03351783 -1.12889888 36.33690536 -1.1328125 32.265625 C-1.13410156 30.96882813 -1.13539063 29.67203125 -1.13671875 28.3359375 C-1.13357666 27.32805176 -1.13357666 27.32805176 -1.13037109 26.29980469 C-1.12505268 24.27010496 -1.13031127 22.2406301 -1.13671875 20.2109375 C-1.12996444 13.38908122 -0.93795486 6.75923023 0 0 Z "
          fill="#FBB715"
          transform="translate(141,45)"
        />
        <path
          d="M0 0 C-0.24403727 2.12569302 -0.49593397 4.2504823 -0.75 6.375 C-0.83362793 7.07906982 -0.91725586 7.78313965 -1.00341797 8.50854492 C-1.55909804 12.99815494 -2.23463279 17.44753682 -3.0234375 21.90234375 C-7.91794896 49.95450159 -8.46127821 80.01055811 2 107 C2.26796387 107.69722168 2.53592773 108.39444336 2.81201172 109.11279297 C8.63987246 124.09376762 15.322214 138.63798395 26.07763672 150.75341797 C27.32421875 152.23046875 27.32421875 152.23046875 29 155 C28.41898776 159.16924169 25.98402335 161.26881683 22.72998047 163.79052734 C19.78435874 165.84988524 16.72800116 167.61543071 13.5625 169.3125 C12.61793945 169.85100586 12.61793945 169.85100586 11.65429688 170.40039062 C7.32291545 172.73746693 4.02295894 173.69566802 -1 173 C-19.38836525 161.96698085 -29.39984769 137.49882866 -36.171875 118.34130859 C-36.8459021 116.43567184 -37.54437438 114.53869503 -38.25 112.64453125 C-45.20926793 92.50071276 -50.22314526 63.17076933 -42.37890625 42.69921875 C-36.86427162 31.90428241 -27.9640157 22.90104721 -19.41015625 14.4375 C-17.17067907 12.17261546 -15.15507687 9.82625465 -13.125 7.375 C-9.46445436 3.2083562 -5.85783903 0 0 0 Z "
          fill="#FBB714"
          transform="translate(74,33)"
        />
        <path
          d="M0 0 C2.07978258 3.11967386 2.42256772 4.63869017 2.9296875 8.26953125 C3.0829248 9.31625 3.23616211 10.36296875 3.39404297 11.44140625 C3.6321167 13.11009766 3.6321167 13.11009766 3.875 14.8125 C5.29823539 24.17163226 6.96335199 33.01746776 10 42 C10.20850586 42.64807617 10.41701172 43.29615234 10.63183594 43.96386719 C17.00751503 63.77566537 26.44416833 81.76750044 40.0546875 97.59765625 C41.96722709 99.95952742 43.50318747 102.35939677 45 105 C38.84924394 107.19669859 33.25276844 108.1299642 26.7265625 108.09765625 C25.57285156 108.09443359 24.41914062 108.09121094 23.23046875 108.08789062 C22.04066406 108.07951172 20.85085937 108.07113281 19.625 108.0625 C18.41199219 108.05798828 17.19898437 108.05347656 15.94921875 108.04882812 C12.96609493 108.03708354 9.98307321 108.0206584 7 108 C-0.80891518 89.13985451 -0.80891518 89.13985451 -3.875 79.625 C-4.24367188 78.48289062 -4.61234375 77.34078125 -4.9921875 76.1640625 C-7.81082338 65.62351033 -8.38974032 54.73271883 -8.375 43.875 C-8.37338867 42.62106445 -8.37177734 41.36712891 -8.37011719 40.07519531 C-8.1842573 25.82958192 -6.17251004 12.88274795 0 0 Z "
          fill="#0D4268"
          transform="translate(18,106)"
        />
        <path
          d="M0 0 C8.22231498 2.85263989 13.78305207 8.37705567 18 16 C19.19925884 19.93090397 19.23822442 21.50020756 17.4453125 25.26171875 C16.69183146 26.4169111 15.91705679 27.55840786 15.125 28.6875 C14.70863281 29.30197998 14.29226563 29.91645996 13.86328125 30.54956055 C-4.92937027 57.87626171 -32.52294923 82.72164438 -65.86328125 89.58984375 C-68.3125 89.9375 -68.3125 89.9375 -72 90 C-72.66 89.34 -73.32 88.68 -74 88 C-70.21846598 84.57861207 -66.35784815 81.51313274 -62.15991211 78.61132812 C-54.11620619 73.03981577 -46.93521005 66.89730054 -40 60 C-39.2869873 59.29302979 -39.2869873 59.29302979 -38.55957031 58.57177734 C-21.95752028 41.87097474 -10.28537507 20.99849203 0 0 Z "
          fill="#10466A"
          transform="translate(255,198)"
        />
        <path
          d="M0 0 C17.60065258 -0.98880071 34.96171466 1.80262646 51.18359375 8.88671875 C54.11562925 10.12982025 54.11562925 10.12982025 57.828125 10.859375 C62.47730929 11.97186426 66.24939924 14.09593464 70.3125 16.5625 C71.04944092 17.00432617 71.78638184 17.44615234 72.5456543 17.90136719 C80.75113941 22.92304881 89.33127907 28.32951827 94 37 C93.01 37.99 93.01 37.99 92 39 C91.26700684 38.74831055 90.53401367 38.49662109 89.77880859 38.23730469 C57.43966856 27.23059691 25.9059295 24.21086992 -8 22 C-7.53104679 16.02910277 -6.27792573 11.74213223 -3.4375 6.5 C-3.10814453 5.86835938 -2.77878906 5.23671875 -2.43945312 4.5859375 C-1.63734445 3.05146874 -0.82024884 1.52484902 0 0 Z "
          fill="#184C6F"
          transform="translate(152,11)"
        />
      </g>
    </g>
  );
};

export default VolleyballComponent;
