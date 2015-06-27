# barber patches to re-route raw compilation via ember compat handlebars
#

module Barber
  class EmberCompatPrecompiler < Barber::Precompiler

    def sources
      [handlebars, precompiler]
    end

    def precompiler
    @precompiler ||= StringIO.new <<END
      var GameOfForums = {};
      #{File.read(Rails.root + "app/assets/javascripts/game-of-forums/lib/ember_compat_handlebars.js")}
      var Barber = {
        precompile: function(string) {
          return GameOfForums.EmberCompatHandlebars.precompile(string,false).toString();
        }
      };
END
    end
  end
end

class Ember::Handlebars::Template
  def precompile_handlebars(string)
    "GameOfForums.EmberCompatHandlebars.template(#{Barber::EmberCompatPrecompiler.compile(string)});"
  end
  def compile_handlebars(string)
    "GameOfForums.EmberCompatHandlebars.compile(#{indent(string).inspect});"
  end
end
