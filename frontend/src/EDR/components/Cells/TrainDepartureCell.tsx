import React from "react";
import {Badge, Button} from "flowbite-react";
import {edrImagesMap} from "../../../config";
import {tableCellCommonClassnames} from "../TrainRow";
import {TimeTableRow} from "../../index";
import {useTranslation} from "react-i18next";
import Tooltip from "rc-tooltip";

type Props = {
    headerSixthhColRef: any;
    ttRow: TimeTableRow;
    trainHasPassedStation: boolean;
    trainMustDepart: boolean;
    playSoundNotification: (callBack: () => void) => void
    streamMode: boolean;

}
export const TrainDepartureCell: React.FC<Props> = ({trainMustDepart,playSoundNotification, ttRow, headerSixthhColRef, trainHasPassedStation, streamMode}) => {
    const {t} = useTranslation();
    const [notificationEnabled, setNotificationEnabled] = React.useState(false);

    React.useEffect(() => {
        if (trainMustDepart && notificationEnabled)
            playSoundNotification(() => setNotificationEnabled(false));
        // eslint-disable-next-line
    }, [notificationEnabled, trainMustDepart]);

    return (
        <td className={tableCellCommonClassnames(streamMode)} style={{minWidth: 150}} ref={headerSixthhColRef}>
            <div className="flex items-center justify-start h-full">
                {ttRow.scheduled_departure}
                <div className="inline-flex items-center h-full pl-4 hidden lg:block">
                    {
                        !trainHasPassedStation && (trainMustDepart ?
                                <Badge className="animate-pulse duration-1000" color="warning">{t('EDR_TRAINROW_train_departing')}</Badge>
                                :
                            <Tooltip placement="top" overlay={<span>{t("EDR_TRAINROW_notify")}</span>}>
                                    <Button outline color="light" className="dark:bg-slate-200" pill size="xs">
                                        <img height={16} width={16} src={notificationEnabled ? edrImagesMap.CHECK : edrImagesMap.BELL} alt={t("EDR_TRAINROW_notify") ?? 'notify'} onClick={() => setNotificationEnabled(!notificationEnabled)}/>
                                    </Button>
                            </Tooltip>
                        )
                    }
                </div>
            </div>
        </td>
    );
}