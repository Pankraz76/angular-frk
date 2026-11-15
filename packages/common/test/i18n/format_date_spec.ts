/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
import localeAr from '../../locales/ar';
import localeDe from '../../locales/de';
import localeEn from '../../locales/en';
import localeEnExtra from '../../locales/extra/en';
import localeFi from '../../locales/fi';
import localeHu from '../../locales/hu';
import localeSr from '../../locales/sr';
import localeTh from '../../locales/th';
import {formatDate, getThursdayThisIsoWeek, isDate, toDate} from '../../src/i18n/format_date';
import {ɵDEFAULT_LOCALE_ID, ɵregisterLocaleData, ɵunregisterLocaleData} from '@angular/core';

describe('Format date', () => {
  describe('toDate', () => {
    it('should support date', () => {
      expect(isDate(toDate(new Date()))).toBeTruthy();
    });

    it('should support int', () => {
      expect(isDate(toDate(123456789))).toBeTruthy();
    });

    it('should support numeric strings', () => {
      expect(isDate(toDate('123456789'))).toBeTruthy();
    });

    it('should support decimal strings', () => {
      expect(isDate(toDate('123456789.11'))).toBeTruthy();
    });

    it('should support ISO string', () => {
      expect(isDate(toDate('2015-06-15T21:43:11Z'))).toBeTruthy();
    });

    it('should support strings with a 5-digit date', () => {
      expect(isDate(toDate('22015-06-15'))).toBeTruthy();
    });

    it('should throw for empty string', () => {
      expect(() => toDate('')).toThrow();
    });

    it('should throw for alpha numeric strings', () => {
      expect(() => toDate('123456789 hello')).toThrow();
    });

    it('should throw for NaN', () => {
      expect(() => toDate(Number.NaN)).toThrow();
    });

    it('should support ISO string without time', () => {
      expect(isDate(toDate('2015-01-01'))).toBeTruthy();
    });

    it('should throw for objects', () => {
      expect(() => toDate({} as any)).toThrow();
    });
  });

  describe('formatDate', () => {
    const isoStringWithoutTime = '2015-01-01';
    const isoStringWithoutTimeOrDate = '2015-01';
    const isoStringWithoutTimeOrDateOrMonth = '2015';
    const defaultFormat = 'mediumDate';
    const date = new Date(2015, 5, 15, 9, 3, 1, 550);

    // Check the transformation of a date into a pattern
    function expectDateFormatAs(date: Date | string, pattern: any, output: string): void {
      expect(formatDate(date, pattern, ɵDEFAULT_LOCALE_ID)).toEqual(
        output,
        `pattern: "${pattern}"`,
      );
    }

    beforeAll(() => {
      ɵregisterLocaleData(localeEn, localeEnExtra);
      ɵregisterLocaleData(localeDe);
      ɵregisterLocaleData(localeHu);
      ɵregisterLocaleData(localeSr);
      ɵregisterLocaleData(localeTh);
      ɵregisterLocaleData(localeAr);
      ɵregisterLocaleData(localeFi);
    });

    afterAll(() => ɵunregisterLocaleData());

    it('should format each component correctly', () => {
      const dateFixtures: any = {
        G: 'AD',
        GG: 'AD',
        GGG: 'AD',
        GGGG: 'Anno Domini',
        GGGGG: 'A',
        y: '2015',
        yy: '15',
        yyy: '2015',
        yyyy: '2015',
        Y: '2015',
        YY: '15',
        YYY: '2015',
        YYYY: '2015',
        M: '6',
        MM: '06',
        MMM: 'Jun',
        MMMM: 'June',
        MMMMM: 'J',
        L: '6',
        LL: '06',
        LLL: 'Jun',
        LLLL: 'June',
        LLLLL: 'J',
        w: '25',
        ww: '25',
        W: '3',
        d: '15',
        dd: '15',
        c: '1',
        cc: '1',
        ccc: 'Mon',
        cccc: 'Monday',
        ccccc: 'M',
        cccccc: 'Mo',
        E: 'Mon',
        EE: 'Mon',
        EEE: 'Mon',
        EEEE: 'Monday',
        EEEEEE: 'Mo',
        h: '9',
        hh: '09',
        H: '9',
        HH: '09',
        m: '3',
        mm: '03',
        s: '1',
        ss: '01',
        S: '5',
        SS: '55',
        SSS: '550',
        a: 'AM',
        aa: 'AM',
        aaa: 'AM',
        aaaa: 'AM',
        aaaaa: 'a',
        b: 'morning',
        bb: 'morning',
        bbb: 'morning',
        bbbb: 'morning',
        bbbbb: 'morning',
        B: 'in the morning',
        BB: 'in the morning',
        BBB: 'in the morning',
        BBBB: 'in the morning',
        BBBBB: 'in the morning',
      };

      const isoStringWithoutTimeFixtures: any = {
        G: 'AD',
        GG: 'AD',
        GGG: 'AD',
        GGGG: 'Anno Domini',
        GGGGG: 'A',
        y: '2015',
        yy: '15',
        yyy: '2015',
        yyyy: '2015',
        Y: '2015',
        YY: '15',
        YYY: '2015',
        YYYY: '2015',
        M: '1',
        MM: '01',
        MMM: 'Jan',
        MMMM: 'January',
        MMMMM: 'J',
        L: '1',
        LL: '01',
        LLL: 'Jan',
        LLLL: 'January',
        LLLLL: 'J',
        w: '1',
        ww: '01',
        W: '1',
        d: '1',
        dd: '01',
        c: '4',
        cc: '4',
        ccc: 'Thu',
        cccc: 'Thursday',
        ccccc: 'T',
        cccccc: 'Th',
        E: 'Thu',
        EE: 'Thu',
        EEE: 'Thu',
        EEEE: 'Thursday',
        EEEEE: 'T',
        EEEEEE: 'Th',
        h: '12',
        hh: '12',
        H: '0',
        HH: '00',
        m: '0',
        mm: '00',
        s: '0',
        ss: '00',
        S: '0',
        SS: '00',
        SSS: '000',
        a: 'AM',
        aa: 'AM',
        aaa: 'AM',
        aaaa: 'AM',
        aaaaa: 'a',
        b: 'midnight',
        bb: 'midnight',
        bbb: 'midnight',
        bbbb: 'midnight',
        bbbbb: 'midnight',
        B: 'midnight',
        BB: 'midnight',
        BBB: 'midnight',
        BBBB: 'midnight',
        BBBBB: 'mi',
      };

      const midnightCrossingPeriods: any = {
        b: 'night',
        bb: 'night',
        bbb: 'night',
        bbbb: 'night',
        bbbbb: 'night',
        B: 'at night',
        BB: 'at night',
        BBB: 'at night',
        BBBB: 'at night',
        BBBBB: 'at night',
      };

      // Suppress console warnings for 'YYYY' patterns.
      const consoleError = console.error;
      spyOn(console, 'error').and.callFake((...args: unknown[]) => {
        if (!/Suspicious use of week-based year/.test(String(args))) {
          consoleError(...args);
        }
      });

      Object.keys(dateFixtures).forEach((pattern: string) => {
        expectDateFormatAs(date, pattern, dateFixtures[pattern]);
      });

      Object.keys(isoStringWithoutTimeFixtures).forEach((pattern: string) => {
        expectDateFormatAs(isoStringWithoutTime, pattern, isoStringWithoutTimeFixtures[pattern]);
      });

      Object.keys(isoStringWithoutTimeFixtures).forEach((pattern: string) => {
        expectDateFormatAs(
          isoStringWithoutTimeOrDate,
          pattern,
          isoStringWithoutTimeFixtures[pattern],
        );
      });

      Object.keys(isoStringWithoutTimeFixtures).forEach((pattern: string) => {
        expectDateFormatAs(
          isoStringWithoutTimeOrDateOrMonth,
          pattern,
          isoStringWithoutTimeFixtures[pattern],
        );
      });

      const nightTime = new Date(2015, 5, 15, 22, 3, 1, 550);
      Object.keys(midnightCrossingPeriods).forEach((pattern) => {
        expectDateFormatAs(nightTime, pattern, midnightCrossingPeriods[pattern]);
      });
    });

    it('should support non-normalized locales', () => {
      expect(formatDate(date, 'short', 'de-DE')).toEqual('15.06.15, 09:03');
      expect(formatDate(date, 'short', 'de_DE')).toEqual('15.06.15, 09:03');
      expect(formatDate(date, 'short', 'de-de')).toEqual('15.06.15, 09:03');
    });

    it('should format with timezones', () => {
      const dateFixtures: any = {
        z: /GMT(\+|-)\d/,
        zz: /GMT(\+|-)\d/,
        zzz: /GMT(\+|-)\d/,
        zzzz: /GMT(\+|-)\d{2}\:30/,
        Z: /(\+|-)\d{2}30/,
        ZZ: /(\+|-)\d{2}30/,
        ZZZ: /(\+|-)\d{2}30/,
        ZZZZ: /GMT(\+|-)\d{2}\:30/,
        ZZZZZ: /(\+|-)\d{2}\:30/,
        O: /GMT(\+|-)\d/,
        OOOO: /GMT(\+|-)\d{2}\:30/,
      };

      Object.keys(dateFixtures).forEach((pattern: string) => {
        expect(formatDate(date, pattern, ɵDEFAULT_LOCALE_ID, '+0430')).toMatch(
          dateFixtures[pattern],
        );
      });
    });

    it('should format common multi component patterns', () => {
      const dateFixtures: any = {
        'EEE, M/d/y': 'Mon, 6/15/2015',
        'EEE, M/d': 'Mon, 6/15',
        'MMM d': 'Jun 15',
        'dd/MM/yyyy': '15/06/2015',
        'MM/dd/yyyy': '06/15/2015',
        'yMEEEd': '20156Mon15',
        'MEEEd': '6Mon15',
        'MMMd': 'Jun15',
        'EEEE, MMMM d, y': 'Monday, June 15, 2015',
        'H:mm a': '9:03 AM',
        'ms': '31',
        'MM/dd/yy hh:mm': '06/15/15 09:03',
        'MM/dd/y': '06/15/2015',
      };

      Object.keys(dateFixtures).forEach((pattern: string) => {
        expectDateFormatAs(date, pattern, dateFixtures[pattern]);
      });
    });

    it('should format with pattern aliases', () => {
      const dateFixtures: any = {
        'MM/dd/yyyy': '06/15/2015',
        shortDate: '6/15/15',
        mediumDate: 'Jun 15, 2015',
        longDate: 'June 15, 2015',
        fullDate: 'Monday, June 15, 2015',
        short: '6/15/15, 9:03 AM',
        medium: 'Jun 15, 2015, 9:03:01 AM',
        long: /June 15, 2015, 9:03:01 AM GMT(\+|-)\d/,
        full: /Monday, June 15, 2015, 9:03:01 AM GMT(\+|-)\d{2}:\d{2}/,
        shortTime: '9:03 AM',
        mediumTime: '9:03:01 AM',
        longTime: /9:03:01 AM GMT(\+|-)\d/,
        fullTime: /9:03:01 AM GMT(\+|-)\d{2}:\d{2}/,
      };

      Object.keys(dateFixtures).forEach((pattern: string) => {
        expect(formatDate(date, pattern, ɵDEFAULT_LOCALE_ID)).toMatch(dateFixtures[pattern]);
      });
    });

    it('should throw if the date format exceeds 256 characters to prevent DoS', () => {
      const expectedError = /Exceeded maximum length of 256 characters/;
      expect(() => formatDate(date, 'y'.repeat(257), ɵDEFAULT_LOCALE_ID)).toThrowError(
        expectedError,
      );
      expect(() => formatDate(date, "'literal'".repeat(257), ɵDEFAULT_LOCALE_ID)).toThrowError(
        expectedError,
      );
    });

    it('should treat format tokens that collide with Object.prototype members as literals', () => {
      // A format token that matches an inherited property name (e.g. `__proto__`) must not
      // resolve to a value off the prototype of the internal format caches. Before the caches
      // were given a null prototype, `__proto__` read back `Object.prototype`, garbling the
      // named-format lookup and crashing the token lookup (it was invoked as a formatter).
      expect(formatDate(date, '__proto__', ɵDEFAULT_LOCALE_ID)).toEqual('__proto__');
      expect(formatDate(date, 'y__proto__', ɵDEFAULT_LOCALE_ID)).toEqual('2015__proto__');
    });

    it('should format invalid in IE ISO date', () =>
      expect(formatDate('2017-01-11T12:00:00.014-0500', defaultFormat, ɵDEFAULT_LOCALE_ID)).toEqual(
        'Jan 11, 2017',
      ));

    it('should format invalid in Safari ISO date', () =>
      expect(formatDate('2017-01-20T12:00:00+0000', defaultFormat, ɵDEFAULT_LOCALE_ID)).toEqual(
        'Jan 20, 2017',
      ));

    // https://github.com/angular/angular/issues/9524
    // https://github.com/angular/angular/issues/9524
    it('should format correctly with iso strings that contain time', () =>
      expect(formatDate('2017-05-07T22:14:39', 'dd-MM-yyyy HH:mm', ɵDEFAULT_LOCALE_ID)).toMatch(
        /07-05-2017 \d{2}:\d{2}/,
      ));

    // https://github.com/angular/angular/issues/21491
    it('should not assume UTC for iso strings in Safari if the timezone is not defined', () => {
      // this test only works if the timezone is not in UTC
      if (new Date().getTimezoneOffset() !== 0) {
        expect(formatDate('2018-01-11T13:00:00', 'HH', ɵDEFAULT_LOCALE_ID)).not.toEqual(
          formatDate('2018-01-11T13:00:00Z', 'HH', ɵDEFAULT_LOCALE_ID),
        );
      }
    });

    // https://github.com/angular/angular/issues/16624
    // https://github.com/angular/angular/issues/17478
    it('should show the correct time when the timezone is fixed', () => {
      expect(
        formatDate('2017-06-13T10:14:39+0000', 'shortTime', ɵDEFAULT_LOCALE_ID, '+0000'),
      ).toEqual('10:14 AM');
      expect(formatDate('2017-06-13T10:14:39+0000', 'h:mm a', ɵDEFAULT_LOCALE_ID, '+0000')).toEqual(
        '10:14 AM',
      );
    });

    // The following test is disabled because backwards compatibility requires that date-only ISO
    // strings are parsed with the local timezone.

    // it('should create UTC date objects when an ISO string is passed with no time components',
    //    () => {
    //      expect(formatDate('2019-09-20', `MMM d, y, h:mm:ss a ZZZZZ`, ɵDEFAULT_LOCALE_ID))
    //          .toEqual('Sep 20, 2019, 12:00:00 AM Z');
    //    });

    // This test is to ensure backward compatibility for parsing date-only ISO strings.
    it('should create local timezone date objects when an ISO string is passed with no time components', () => {
      // Dates created with individual components are evaluated against the local timezone. See
      // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/Date#Individual_date_and_time_component_values
      const localDate = new Date(2019, 8, 20, 0, 0, 0, 0);
      expect(formatDate('2019-09-20', `MMM d, y, h:mm:ss a ZZZZZ`, ɵDEFAULT_LOCALE_ID)).toEqual(
        formatDate(localDate, `MMM d, y, h:mm:ss a ZZZZZ`, ɵDEFAULT_LOCALE_ID),
      );
    });

    it('should create local timezone date objects when an ISO string is passed with time components', () => {
      const localDate = new Date(2019, 8, 20, 0, 0, 0, 0);
      expect(
        formatDate('2019-09-20T00:00:00', `MMM d, y, h:mm:ss a ZZZZZ`, ɵDEFAULT_LOCALE_ID),
      ).toEqual(formatDate(localDate, `MMM d, y, h:mm:ss a ZZZZZ`, ɵDEFAULT_LOCALE_ID));
    });

    it('should remove bidi control characters', () =>
      expect(formatDate(date, 'MM/dd/yyyy', ɵDEFAULT_LOCALE_ID)!.length).toEqual(10));

    it(`should format the date correctly in various locales`, () => {
      expect(formatDate(date, 'short', 'de')).toEqual('15.06.15, 09:03');
      expect(formatDate(date, 'short', 'ar')).toEqual('15‏/6‏/2015، 9:03 ص');
      expect(formatDate(date, 'dd-MM-yy', 'th')).toEqual('15-06-15');
      expect(formatDate(date, 'a', 'hu')).toEqual('de.');
      expect(formatDate(date, 'a', 'sr')).toEqual('AM');

      // TODO(ocombe): activate this test when we support local numbers
      // expect(formatDate(date, 'hh', 'mr')).toEqual('०९');
    });

    it('should throw if we use getExtraDayPeriods without loading extra locale data', () => {
      expect(() => formatDate(date, 'b', 'de')).toThrowError(
        /Missing extra locale data for the locale "de"/,
      );
    });

    // https://github.com/angular/angular/issues/24384
    it('should not round fractional seconds', () => {
      expect(formatDate(3999, 'm:ss', 'en')).toEqual('0:03');
      expect(formatDate(3999, 'm:ss.S', 'en')).toEqual('0:03.9');
      expect(formatDate(3999, 'm:ss.SS', 'en')).toEqual('0:03.99');
      expect(formatDate(3999, 'm:ss.SSS', 'en')).toEqual('0:03.999');
      expect(formatDate(3000, 'm:ss', 'en')).toEqual('0:03');
      expect(formatDate(3000, 'm:ss.S', 'en')).toEqual('0:03.0');
      expect(formatDate(3000, 'm:ss.SS', 'en')).toEqual('0:03.00');
      expect(formatDate(3000, 'm:ss.SSS', 'en')).toEqual('0:03.000');
      expect(formatDate(3001, 'm:ss', 'en')).toEqual('0:03');
      expect(formatDate(3001, 'm:ss.S', 'en')).toEqual('0:03.0');
      expect(formatDate(3001, 'm:ss.SS', 'en')).toEqual('0:03.00');
      expect(formatDate(3001, 'm:ss.SSS', 'en')).toEqual('0:03.001');
    });

    // https://github.com/angular/angular/issues/38739
    it('should return correct ISO 8601 week-numbering year for dates close to year end/beginning', () => {
      expect(formatDate('2013-12-27', `YYYY 'W'ww`, 'en')).toEqual('2013 W52');
      expect(formatDate('2013-12-29', `YYYY 'W'ww`, 'en')).toEqual('2013 W52');
      expect(formatDate('2013-12-31', `YYYY 'W'ww`, 'en')).toEqual('2014 W01');

      // Dec. 31st is a Sunday, last day of the last week of 2023
      expect(formatDate('2023-12-31', `YYYY 'W'ww`, 'en')).toEqual('2023 W52');

      expect(formatDate('2010-01-02', `YYYY 'W'ww`, 'en')).toEqual('2009 W53');
      expect(formatDate('2010-01-04', `YYYY 'W'ww`, 'en')).toEqual('2010 W01');
      expect(formatDate('0049-01-01', `YYYY 'W'ww`, 'en')).toEqual('0048 W53');
      expect(formatDate('0049-01-04', `YYYY 'W'ww`, 'en')).toEqual('0049 W01');
    });

    it('should throw an error when using YYYY incorrectly', () => {
      expect(() => formatDate('2013-12-31', `YYYY/MM/dd`, ɵDEFAULT_LOCALE_ID)).toThrowError(
        /.*Suspicious use of week-based year "Y".*/,
      );
    });

    // https://github.com/angular/angular/issues/53813
    it('should return correct ISO 8601 week number close to year end/beginning', () => {
      expect(formatDate('2013-12-27', 'w', 'en')).toEqual('52');
      expect(formatDate('2013-12-29', 'w', 'en')).toEqual('52');
      expect(formatDate('2013-12-31', 'w', 'en')).toEqual('1');

      // Dec. 31st is a Sunday, last day of the last week of 2023
      expect(formatDate('2023-12-31', 'w', 'en')).toEqual('52');

      expect(formatDate('2010-01-02', 'w', 'en')).toEqual('53');
      expect(formatDate('2010-01-04', 'w', 'en')).toEqual('1');
      expect(formatDate('0049-01-01', 'w', 'en')).toEqual('53');
      expect(formatDate('0049-01-04', 'w', 'en')).toEqual('1');
    });

    // https://github.com/angular/angular/issues/40377
    it('should format date with year between 0 and 99 correctly', () => {
      expect(formatDate('0098-01-11', `YYYY 'W'ww`, ɵDEFAULT_LOCALE_ID)).toEqual('0098 W02');
      expect(formatDate('0099-01-11', `YYYY 'W'ww`, ɵDEFAULT_LOCALE_ID)).toEqual('0099 W02');
      expect(formatDate('0100-01-11', `YYYY 'W'ww`, ɵDEFAULT_LOCALE_ID)).toEqual('0100 W02');
      expect(formatDate('0001-01-11', `YYYY 'W'ww`, ɵDEFAULT_LOCALE_ID)).toEqual('0001 W02');
      expect(formatDate('0000-01-11', `YYYY 'W'ww`, ɵDEFAULT_LOCALE_ID)).toEqual('0000 W02');
    });

    // https://github.com/angular/angular/issues/26922
    it('should support fullDate in finnish, which uses standalone week day', () => {
      expect(formatDate(date, 'fullDate', 'fi')).toMatch('maanantai 15. kesäkuuta 2015');
    });

    it('should wrap negative years', () => {
      const date = new Date(new Date('2024-01-13').setFullYear(-1)); // Year -1
      expect(formatDate(date, 'yyyy', ɵDEFAULT_LOCALE_ID)).toEqual('0002');
    });

    it('should support years < 1000', () => {
      expect(formatDate(new Date('0054-02-18'), 'yyy', ɵDEFAULT_LOCALE_ID)).toEqual('054');
      expect(formatDate(new Date('0054-02-18'), 'yyyy', ɵDEFAULT_LOCALE_ID)).toEqual('0054');
      expect(formatDate(new Date('0803-02-18'), 'yyyy', ɵDEFAULT_LOCALE_ID)).toEqual('0803');
    });

    it('should support timezones', () => {
      const isoDate = '2024-02-17T12:00:00Z';

      const dateEst = formatDate(isoDate, 'long', 'en', 'EST');
      expect(dateEst).toBe('February 17, 2024, 7:00:00 AM GMT-5');

      const dateOffset = formatDate(isoDate, 'long', 'en', '+0500');
      expect(dateOffset).toBe('February 17, 2024, 5:00:00 PM GMT+5');
    });

    it('should return thursday date of the same week', () => {
      // Dec. 31st is a Sunday, last day of the last week of 2023
      expect(getThursdayThisIsoWeek(new Date(2023, 11, 31))).toEqual(new Date(2023, 11, 28));

      // Dec. 29th is a Thursday
      expect(getThursdayThisIsoWeek(new Date(2022, 11, 29))).toEqual(new Date(2022, 11, 29));

      // Jan 01st is a Monday
      expect(getThursdayThisIsoWeek(new Date(2024, 0, 1))).toEqual(new Date(2024, 0, 4));
    });

    describe('Temporal support', () => {
      describe('given a Temporal.Instant', () => {
        const value = instant('2024-02-17T12:00:00.789Z');

        it('when converted to a date, then it represents the same exact time', () => {
          expect(toDate(value)).toEqual(new Date('2024-02-17T12:00:00.789Z'));
        });

        it('when formatted with a timezone, then the exact time is shown in that timezone', () => {
          expect(formatDate(value, 'long', 'en', '+0500')).toBe(
            'February 17, 2024, 5:00:00 PM GMT+5',
          );
        });

        it('when formatted without a timezone, then it is shown like the equivalent Date', () => {
          const format = 'yyyy-MM-dd HH:mm:ss.SSS ZZZZZ';
          expect(formatDate(value, format, 'en')).toBe(
            formatDate(new Date(value.epochMilliseconds), format, 'en'),
          );
        });
      });

      describe('given a Temporal.ZonedDateTime', () => {
        // 2024-02-17T12:00:00.789Z in a time zone that is 9 hours ahead of UTC.
        const value = zonedDateTime(
          '2024-02-17T12:00:00.789Z',
          9 * 60,
          [2024, 2, 17, 21, 0, 0, 789],
        );

        it('when converted to a date, then it represents the same exact time', () => {
          expect(toDate(value)).toEqual(new Date('2024-02-17T12:00:00.789Z'));
        });

        it('when formatted without a timezone, then its own wall-clock time and offset are shown', () => {
          expect(formatDate(value, 'yyyy-MM-dd HH:mm:ss.SSS ZZZZZ', 'en')).toBe(
            '2024-02-17 21:00:00.789 +09:00',
          );
          expect(formatDate(value, 'long', 'en')).toBe('February 17, 2024, 9:00:00 PM GMT+9');
        });

        it('when formatted with a timezone, then the explicit timezone wins', () => {
          expect(formatDate(value, 'long', 'en', '+0500')).toBe(
            'February 17, 2024, 5:00:00 PM GMT+5',
          );
        });

        it('when its offset is negative with minutes, then the offset is shown correctly', () => {
          const newfoundland = zonedDateTime(
            '2024-02-17T12:00:00Z',
            -(3 * 60 + 30),
            [2024, 2, 17, 8, 30, 0, 0],
          );
          expect(formatDate(newfoundland, 'HH:mm ZZZZZ', 'en')).toBe('08:30 -03:30');
        });
      });

      describe('given a Temporal.PlainDateTime', () => {
        const value = wallClock('Temporal.PlainDateTime', [2024, 2, 17, 21, 5, 9, 789]);

        it('when converted to a date, then the local fields match its wall-clock time', () => {
          expect(toDate(value)).toEqual(new Date(2024, 1, 17, 21, 5, 9, 789));
        });

        it('when formatted, then its wall-clock time is shown', () => {
          expect(formatDate(value, 'yyyy-MM-dd HH:mm:ss.SSS', 'en')).toBe(
            '2024-02-17 21:05:09.789',
          );
        });

        it('when formatted with a timezone, then the wall-clock time is not shifted', () => {
          expect(formatDate(value, 'yyyy-MM-dd HH:mm', 'en', '+0500')).toBe('2024-02-17 21:05');
          expect(formatDate(value, 'yyyy-MM-dd HH:mm', 'en', '-1200')).toBe('2024-02-17 21:05');
        });

        it('when its year is below 100, then the year is not mapped to the 20th century', () => {
          const early = wallClock('Temporal.PlainDateTime', [54, 2, 18, 10, 30]);
          expect(formatDate(early, 'yyyy-MM-dd HH:mm', 'en')).toBe('0054-02-18 10:30');
        });
      });

      describe('given a Temporal.PlainDate', () => {
        const value = wallClock('Temporal.PlainDate', [2024, 2, 17]);
        // A real `Temporal.PlainDate` has no time fields at all.
        const {hour, minute, second, millisecond, ...plainDate} = value;

        it('when converted to a date, then it is midnight of that day in local time', () => {
          expect(toDate(plainDate)).toEqual(new Date(2024, 1, 17));
        });

        it('when formatted, then the date is shown', () => {
          expect(formatDate(plainDate, 'mediumDate', 'en')).toBe('Feb 17, 2024');
          expect(formatDate(plainDate, 'EEEE, MMMM d, y', 'de')).toBe('Samstag, Februar 17, 2024');
        });

        it('when formatted with time fields, then midnight is shown like for a date-only string', () => {
          expect(formatDate(plainDate, 'yyyy-MM-dd HH:mm:ss', 'en')).toBe(
            formatDate('2024-02-17', 'yyyy-MM-dd HH:mm:ss', 'en'),
          );
        });

        it('when formatted with a timezone, then the date is not shifted', () => {
          expect(formatDate(plainDate, 'yyyy-MM-dd', 'en', '+1400')).toBe('2024-02-17');
          expect(formatDate(plainDate, 'yyyy-MM-dd', 'en', '-1200')).toBe('2024-02-17');
        });
      });

      describe('given a Temporal value in a non-ISO calendar', () => {
        it('when formatted, then the fields of the ISO 8601 calendar are shown', () => {
          // 2024-02-17 is 8 Adar I 5784 in the Hebrew calendar.
          const hebrew = {year: 5784, month: 6, day: 8};
          const date = wallClock('Temporal.PlainDate', [2024, 2, 17], 'hebrew', hebrew);
          const dateTime = wallClock(
            'Temporal.PlainDateTime',
            [2024, 2, 17, 21, 5],
            'hebrew',
            hebrew,
          );
          const zoned = {
            ...zonedDateTime('2024-02-17T12:05:00Z', 9 * 60, [2024, 2, 17, 21, 5]),
            ...wallClock('Temporal.ZonedDateTime', [2024, 2, 17, 21, 5], 'hebrew', hebrew),
          };

          expect(formatDate(date, 'yyyy-MM-dd', 'en')).toBe('2024-02-17');
          expect(formatDate(dateTime, 'yyyy-MM-dd HH:mm', 'en')).toBe('2024-02-17 21:05');
          expect(formatDate(zoned, 'yyyy-MM-dd HH:mm', 'en')).toBe('2024-02-17 21:05');
        });
      });

      describe('given a Temporal value that is not a date', () => {
        for (const type of ['PlainTime', 'PlainYearMonth', 'PlainMonthDay', 'Duration']) {
          it(`when a Temporal.${type} is formatted, then an error names the unsupported type`, () => {
            const value = {[Symbol.toStringTag]: `Temporal.${type}`} as any;
            expect(() => formatDate(value, 'mediumDate', 'en')).toThrowError(
              new RegExp(`NG02311: .*Temporal\\.${type} is not supported`),
            );
          });
        }
      });

      // These specs only run on runtimes that ship the standardized Temporal API (early drafts
      // had no `calendarId`). The structural stand-ins above cover the same behavior everywhere.
      const Temporal = (globalThis as any).Temporal;
      const hasTemporal = typeof Temporal?.PlainDate.from('2024-02-17').calendarId === 'string';
      (hasTemporal ? describe : xdescribe)('given values of the native Temporal API', () => {
        it('when an Instant is formatted, then the exact time is shown', () => {
          const value = Temporal.Instant.from('2024-02-17T12:00:00.789123456Z');
          expect(formatDate(value, 'yyyy-MM-dd HH:mm:ss.SSS ZZZZZ', 'en', '+0500')).toBe(
            '2024-02-17 17:00:00.789 +05:00',
          );
        });

        it('when a ZonedDateTime is formatted, then its own wall-clock time and offset are shown', () => {
          const value = Temporal.ZonedDateTime.from('2024-02-17T21:00:00.789+09:00[Asia/Tokyo]');
          expect(formatDate(value, 'yyyy-MM-dd HH:mm:ss.SSS ZZZZZ', 'en')).toBe(
            '2024-02-17 21:00:00.789 +09:00',
          );
          expect(formatDate(value, 'yyyy-MM-dd HH:mm ZZZZZ', 'en', 'UTC')).toBe(
            '2024-02-17 12:00 Z',
          );
        });

        it('when a PlainDateTime is formatted, then its wall-clock time is shown', () => {
          const value = Temporal.PlainDateTime.from('2024-02-17T21:05:09.789');
          expect(formatDate(value, 'yyyy-MM-dd HH:mm:ss.SSS', 'en', '-1200')).toBe(
            '2024-02-17 21:05:09.789',
          );
        });

        it('when a PlainDate is formatted, then the date is shown', () => {
          const value = Temporal.PlainDate.from('2024-02-17');
          expect(formatDate(value, 'fullDate', 'en', '+1400')).toBe('Saturday, February 17, 2024');
        });

        it('when a value uses a non-ISO calendar, then the ISO 8601 fields are shown', () => {
          const date = Temporal.PlainDate.from('2024-02-17[u-ca=hebrew]');
          const zoned = Temporal.ZonedDateTime.from(
            '2024-02-17T21:05+09:00[Asia/Tokyo][u-ca=hebrew]',
          );
          expect(date.year).toBe(5784);
          expect(formatDate(date, 'yyyy-MM-dd', 'en')).toBe('2024-02-17');
          expect(formatDate(zoned, 'yyyy-MM-dd HH:mm', 'en')).toBe('2024-02-17 21:05');
        });

        it('when a value is not a date, then an error names the unsupported type', () => {
          for (const value of [
            Temporal.PlainTime.from('21:05'),
            Temporal.PlainYearMonth.from('2024-02'),
            Temporal.PlainMonthDay.from('02-17'),
            Temporal.Duration.from('PT1H'),
          ]) {
            expect(() => formatDate(value, 'mediumDate', 'en')).toThrowError(/is not supported/);
          }
        });
      });
    });
  });
});

type IsoFields = [
  year: number,
  month: number,
  day: number,
  hour?: number,
  minute?: number,
  second?: number,
  millisecond?: number,
];

/**
 * Structural stand-ins for Temporal objects. They allow these tests to run on runtimes that do
 * not ship Temporal yet. `calendarFields` are the values reported while the object uses the
 * non-ISO calendar `calendarId`.
 */
function wallClock<T extends string>(
  tag: T,
  [year, month, day, hour = 0, minute = 0, second = 0, millisecond = 0]: IsoFields,
  calendarId = 'iso8601',
  calendarFields: {year?: number; month?: number; day?: number} = {},
) {
  const iso = {year, month, day, hour, minute, second, millisecond};
  return {
    ...iso,
    ...(calendarId === 'iso8601' ? {} : calendarFields),
    calendarId,
    withCalendar: (calendar: string) => {
      if (calendar !== 'iso8601') {
        throw new Error(`Unexpected calendar "${calendar}"`);
      }
      return iso;
    },
    [Symbol.toStringTag]: tag,
  };
}

function instant(iso: string) {
  return {epochMilliseconds: Date.parse(iso), [Symbol.toStringTag]: 'Temporal.Instant' as const};
}

function zonedDateTime(iso: string, offsetMinutes: number, fields: IsoFields) {
  return {
    ...wallClock('Temporal.ZonedDateTime', fields),
    epochMilliseconds: Date.parse(iso),
    offsetNanoseconds: offsetMinutes * 60e9,
  };
}
