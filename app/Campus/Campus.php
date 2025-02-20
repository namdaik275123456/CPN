<?php

namespace App\Helpers\Campus;

use Illuminate\Support\Facades\Log;

class Campus
{
    const CAMPUS = [
        'ph' => 'FPLHN',
        'ps' => 'FPLHCM',
        'pc' => 'FPLCT',
        'pd' => 'FPLDN',
        'pk' => 'FPLTN',
        'pp' => 'FPLHP',
        'pn' => 'FPLHNA',
        'pa' => 'FPLTH',
        'py' => 'FPLBD',
        'pt' => 'FPLTHN',
        'pi' => 'FPLDNA',
        'th' => 'PTCDHN',
        'ts' => 'PTCDHCM',
        'td' => 'PTCDDN',
        'tk' => 'PTCDTN',
        'tc' => 'PTCDCT',
        'tp' => 'PTCDHP',
        'tt' => 'PTCDH',
        'tb' => 'PTCDDNA',
        'tg' => 'PTCDBG',
        'ti' => 'PTCDQNH',
        'tu' => 'PTCDTHN',
        'tv' => 'PTCDBDU',
        'tq' => 'PTCDQNA',
        'ty' => 'PTCDBRVT',
        'to' => 'PTCDTH',
        'tl' => 'PTCDVP',
        'tn' => 'PTCDBP',
        'tm' => 'PTCDHNA',
        'ta' => 'PTCDND',
        'tx' => 'PTCDNTR',
        'tw' => 'PTCDNA',
        'bh' => 'BTECHN',
        'bs' => 'BTECHCM',
        'bc' => 'BTECCT',
        'bd' => 'BTECDN',
        'mh' => 'MELPHN',
        'ms' => 'MELPHCM',

    ];

    /**
     * danh sách các campus code FPI
     *
     * @var array
     */
    public const FPI_CAMPUS = ['bh', 'bs', 'bc', 'bd', 'mh', 'ms'];

    /**
     * danh sách các campus code Poly
     *
     * @var array
     */
    public const POLY_CAMPUS = ['pp', 'ph', 'pd', 'ps', 'pk', 'pc', 'pa', 'pn', 'py', 'pt', 'pi'];

    /**
     * danh sách các campus code PTCD
     *
     * @var array
     */
    public const POLY9_CAMPUS = ['th', 'ts', 'td', 'tk', 'tc', 'tp', 'tt', 'tb', 'tg', 'ti', 'tu', 'tv', 'tq', 'ty', 'to', 'tl', 'tn', 'tm', 'ta', 'tx', 'tw'];



    /**
     * getCampusCode
     *
     * @param  string $campusDB
     */
    public static function getCampusCode($campusDB)
    {
        $campusCode = self::CAMPUS[$campusDB];
        if ($campusCode) {
            return $campusCode;
        }
        throw new \Exception('campus_db does not exist!');
    }

    /**
     * getCampusDb
     *
     * @param  string $campusCode
     */
    public static function getCampusDb($campusCode)
    {
        $campusDB = array_search($campusCode, self::CAMPUS);
        if ($campusDB) {
            return $campusDB;
        }
        throw new \Exception('campus_code does not exist!');
    }

    /**
     * get loai san pham cua campus
     * @param string $campusDb
     * @return string|null (FPI, POLY, POLY9)
     */
    public static function getCampusProductType($campusDb)
    {
        if (in_array($campusDb, self::FPI_CAMPUS)) {
            return 'FPI';
        }
        if (in_array($campusDb, self::POLY_CAMPUS)) {
            return 'POLY';
        }
        if (in_array($campusDb, self::POLY9_CAMPUS)) {
            return 'POLY9';
        }
        return null;
    }

    /**
     * get danh sach campus code theo loai san pham
     * @param string $productType (FPI, POLY, POLY9)
     * @return array
     */
    public static function getCampusDbByCampusProductType($campusProductType)
    {
        switch ($campusProductType) {
            case 'FPI':
                return self::FPI_CAMPUS;
            case 'POLY':
                return self::POLY_CAMPUS;
            case 'POLY9':
                return self::POLY9_CAMPUS;
            default:
                return [];
        }
    }

    /**
     * chuyển đổi campus code từ dng sang local campus db
     * @param string $dngCampusCode
     * @return string
     */
    public static function dngCampusCodeToLocalCampusDb($dngCampusCode)
    {
        try {
            $localCampusDb = array_search($dngCampusCode, self::CAMPUS);
            if ($localCampusDb) {
                return $localCampusDb;
            }
            Log::error("Helper/Campus/Campus.php@dngCampusCodeToLocalCampusDb - dngCampusCode not existed: " . $dngCampusCode);
            throw new \Exception('dngCampusCode does not exist!');
        } catch (\Throwable $th) {
            Log::error("Helper/Campus/Campus.php@dngCampusCodeToLocalCampusDb - " . $th->getLine() . " - " . $th->getMessage());
            throw new \Exception("Helper/Campus/Campus.php@dngCampusCodeToLocalCampusDb - " . $th->getLine() . " - " . $th->getMessage());
        }
    }

    /**
     * chuyển đổi campus code từ local sang dng campus code
     * @param string $localCampusDb
     * @return string
     */
    public static function localCampusDbToDngCampusCode($localCampusDb)
    {
        try {
            $dngCampusCode = self::CAMPUS[$localCampusDb];
            if ($dngCampusCode) {
                return $dngCampusCode;
            }
            Log::error("Helper/Campus/Campus.php@localCampusDbToDngCampusCode - localCampusDb not existed: " . $localCampusDb);
            throw new \Exception('localCampusDb does not exist!');
        } catch (\Throwable $th) {
            Log::error("Helper/Campus/Campus.php@localCampusDbToDngCampusCode - " . $th->getLine() . " - " . $th->getMessage());
            throw new \Exception("Helper/Campus/Campus.php@localCampusDbToDngCampusCode - " . $th->getLine() . " - " . $th->getMessage());
        }
    }
}
