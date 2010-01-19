//
// The Antville Project
// http://code.google.com/p/antville
//
// Copyright 2001-2007 by The Antville People
//
// Licensed under the Apache License, Version 2.0 (the ``License'');
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//    http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an ``AS IS'' BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
//
// $Revision:3333 $
// $LastChangedBy:piefke3000 $
// $LastChangedDate:2007-09-15 01:25:23 +0200 (Sat, 15 Sep 2007) $
// $URL$
//

Admin.purgeReferrers = function() {
   var sql = new Sql;
   var result = sql.execute("delete from log where action = 'main' and " +
         "created < dateadd('day', -2, current_date())");
   return result;
}
